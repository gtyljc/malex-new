
// others
import Image from "next/image"

//images
import expirience from "./expirience.svg"
import quality from "./quality.svg"
import effiency from "./efficiency.svg"
import transparency from "./transparency.svg"

function WcuCard({ title, undertitle, icon }) {
    return (
        <li className="w-[50%] aspect-square p-1 box-border">
            <div className="h-full flex flex-col items-center justify-center gap-3 bg-ice-blue p-4 box-border">
                { icon }
                <h1 className="text-center font-semibold text-lg">{ title }</h1>
                <h2 className="text-center">{ undertitle }</h2>
            </div>
        </li>
    )    
}

export default function WcuSection(){
    return (
        <section>
            <h1 className="mb-5 text-center text-2xl font-medium">Why Choose us</h1>
            <ul className="flex flex-row flex-wrap">
                <WcuCard
                    title="Experience"
                    undertitle="over 10 years of industry experience."
                    icon={
                        <Image
                            src={ expirience }
                            alt="Malex experience"
                        />
                    }
                />
                <WcuCard
                    title="Quality"
                    undertitle="over 10 years of industry experience."
                    icon={
                        <Image
                            src={ quality }
                            alt="Malex quality"
                        />
                    }
                />
                <WcuCard
                    title="Efficiency"
                    undertitle="over 10 years of industry experience."
                    icon={
                        <Image
                            src={ effiency }
                            alt="Malex efficiency"
                        />
                    }
                />
                <WcuCard
                    title="Transparency"
                    undertitle="over 10 years of industry experience."
                    icon={
                        <Image
                            src={ transparency }
                            alt="Malex experience"
                        />
                    }
                />
            </ul>
        </section>
    )
}