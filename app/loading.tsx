import Image from "next/image";

export default function Loading() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-10 h-10 relitive animate-spin">
        <Image 
        fill
        alt="logo"
        src="/logo.png"
        />
      </div>
    </div>
  )
}