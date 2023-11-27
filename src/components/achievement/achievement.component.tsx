import Image from "next/image";

export function Achievement({ icon, title, subtitle }: { icon : string, title: string, subtitle : string }){
    return <div className="bg-[#EADDFF] p-2 flex rounded-[18px] gap-2 items-center max-w-[200px] w-[200px]">
        <div className="rounded-[16px] overflow-clip min-w-[48px]"><Image src={ icon } width={ 48 } height={ 48 } alt={ title } /></div>
        <div className="flex gap-1 flex-col  overflow-clip">
            <div className="text-sm whitespace-nowrap text-ellipsis">{ title }</div>
            <div className="text-xs opacity-40 whitespace-nowrap text-ellipsis">{ subtitle }</div>
        </div>
    </div>
}