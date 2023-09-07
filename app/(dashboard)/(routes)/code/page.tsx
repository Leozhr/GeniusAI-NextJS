"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Code } from "lucide-react";
import { ChatCompletionRequestMessage } from "openai";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

import { BotAvatar } from "@/components/bot-avatar";
import { Empty } from "@/components/empty";
import { Heading } from "@/components/heading";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/user-avatar";
import { useModal } from "@/hooks/use-pro-model";
import { cn } from "@/lib/utils";


const CodePage = () => {
  const proModal = useModal();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = { role: "user", content: values.prompt };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/code", {
        messages: newMessages
      })

      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      }
    } finally {
      router.refresh();
    }
  }

  return (
    <div>
      <Heading
      title="Code Generation"
      description="Generate code with the power of AI"
      icon={Code}
      iconColor="text-green-700"
      bgColor="bg-green-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3
              md:px-6 focus-within:shadow-sm grid grid-cols-12
              gap-2 bg-white"
            >
              <FormField 
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="p-0 m-0">
                    <Input
                     className="border-0 outline-none focus-visible:ring-0
                     focus-visible:ring-transparent"
                     disabled={isLoading}
                     placeholder="Ask me anything about your code..."
                     {...field}
                    />
                  </FormControl>
                </FormItem>
                )}
              />
              <Button 
              className="col-span-12 lg:col-span-2 w-full"
              disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          <div className="flex flex-col-reverse gap-y-4">
            {isLoading && (
              <div className="p-8 rounded-lg w-full flex items-center
              justify-center bg-gray-100 border border-black/10">
                <Loader />
              </div>
            )}

            {messages.length === 0 && !isLoading && (
              <Empty label="No Conversation Started." />
            )}

            {messages.map((message) => (
              <div 
              key={message.content}
              className={cn(
                "p-8 w-full flex items-start gap-x-8 rounded-lg",
                message.role === "user" ? "bg-white border border-black/10" : 
                "bg-gray-100 border border-black/10"
              )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-black/10 p-2
                      rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code className="bg-black/10 rounded-lg p-1" {...props} />
                    )
                  }}
                  className="text-sm overflow-hidden leading-7"
                >
                  {message.content || ""}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodePage;