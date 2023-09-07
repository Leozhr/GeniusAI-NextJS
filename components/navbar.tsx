import MobileSidebar from "@/components/mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { UserButton } from "@clerk/nextjs";

const Navbar = async () => {
  const userApiLimit = await getApiLimitCount();

  return (
    <div className="flex items-center p-4">
      <MobileSidebar userApiLimit={userApiLimit} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}

export default Navbar;