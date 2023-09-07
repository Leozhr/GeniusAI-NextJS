import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { ModalProvider } from "@/providers/modal";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const userApiLimit = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className="h-full relative">
      <ModalProvider />
      <div className="h-full hidden md:flex md:flex-col
      md:fixed md:w-72 md:inset-y-0 bg-gray-900">
        <div>
          <Sidebar 
            userApiLimit={userApiLimit} 
            isPro={isPro}
          />
        </div>
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout;