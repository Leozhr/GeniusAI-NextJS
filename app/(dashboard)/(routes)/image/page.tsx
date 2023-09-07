"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { amountOption, formSchema, resolutionOption } from "./constants";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Empty } from "@/components/empty";
import { Heading } from "@/components/heading";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useModal } from "@/hooks/use-pro-model";
import { SelectContent } from "@radix-ui/react-select";
import Image from "next/image";


const ImagePage = () => {
  const proModal = useModal();
  const router = useRouter();
  const [photo, setPhotos] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "256x256",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setPhotos([]);

      const response = await axios.post("/api/image", values);

      const urls = await response.data.map((image: { url: string }) => image.url);

      console.log(urls, response.data);

      setPhotos(urls);
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
      title="Image Generation"
      description="Image Generation with OpenAI" 
      icon={ImageIcon}
      iconColor="text-pink-700"
      bgColor="bg-pink-700/10"
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
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormControl className="p-0 m-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0
                      focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Ask me anything about your image..."
                     {...field}
                    />
                  </FormControl>
                </FormItem>
                )}
              />
              <FormField 
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOption.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value} 
                          className="bg-white"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
              />
              <FormField 
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOption.map((option) => (
                        <SelectItem 
                        key={option.value} 
                        value={option.value} 
                        className="bg-white"
                      >
                        {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              <div className="p-20">
                <Loader />
              </div>
            )}

            {photo.length === 0 && !isLoading && (
              <Empty label="No Images Generated." />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
            xl:grid-cols-4 gap-4 mt-8">
              {photo.map((photo) => (
                <Card 
                  key={photo}
                  className="rounded-lg overflow-hidden"
                >
                  <div className="relative aspect-square">
                    <Image
                      fill
                      alt="Generated Image"
                      src={photo}
                    />
                  </div>
                  <CardFooter className="p-2">
                    <Button
                      onClick={() => window.open(photo)}
                      variant={"secondary"}
                      className="w-full"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImagePage;