import Image from "next/image"

export const Empty = ({ label }: { label: string }) => {
  return (
    <div className="h-full p-20 flex flex-col items-center
    justify-center">
      <div className="relative h-72 w-72">
        <Image
        fill
        alt="empty"
        src="/empty.png"
        />
      </div>
      <p className="text-muted-foreground text-center text-sm">
        {label}
      </p>

    </div>
  )
}