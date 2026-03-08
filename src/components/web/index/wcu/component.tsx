
// others
import Image from "next/image"

//images
import expirience from "./expirience.svg"
import quality from "./quality.svg"
import effiency from "./efficiency.svg"
import transparency from "./transparency.svg"

interface WCUCardParams {
    title: string,
    undertitle: string,
    icon: string
}

function WCUCard({ title, undertitle, icon }: WCUCardParams) {
    return (
        <div
            className="
                w-[50%] aspect-square flex flex-col items-center justify-center 
                gap-3 bg-ice-blue p-6 box-border rounded-[5px] mb:p-8 lg:p-10
            "
        >
            <Image
                src={ icon }
                alt="Why us?"
            />
            <h1 className="text-center font-semibold text-lg">{ title }</h1>
            <h2 className="text-center">{ undertitle }</h2>
        </div>
    )    
}

interface WCUCardRowParams {
    children?: React.ReactNode
}

function WCUCardRow({ children }: WCUCardRowParams){
    return (
        <li className="w-full max-w-[650px] flex flex-row gap-3 lg:max-w-none lg:w-[50%]">
            { children }
        </li>
    )
}

export default function WcuSection(){
    return (
        <section>
            <h1 className="mb-7 text-center section-title">Why Choose us</h1>
            <ul className="flex flex-col justify-center items-center gap-3 lg:flex-row">
                <WCUCardRow>
                    <WCUCard
                        title="Experience"
                        undertitle="over 10 years of industry experience."
                        icon={ expirience }
                    />
                    <WCUCard
                        title="Quality"
                        undertitle="we use only certified materials and equipment."
                        icon={ quality }
                    />
                </WCUCardRow>
                <WCUCardRow>
                    <WCUCard
                        title="Efficiency"
                        undertitle="we complete projects on time and according to a agreed plan."
                        icon={ effiency }
                    />
                    <WCUCard
                        title="Transparency"
                        undertitle="clear and affordable pricing with no hidden fees."
                        icon={ transparency }
                    />
                </WCUCardRow>
            </ul>
        </section>
    )
}