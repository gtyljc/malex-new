
// others
import Image from "next/image";
import clsx from "clsx";

// images
import experience_svg from "./experience.svg";
import client_svg from "./client.svg";
import certicate_svg from "./certificate.svg";

function Card({ label, img }){
    return(
        <div className={ 
                clsx(
                    "w-full flex flex-col items-center bg-ice-blue box-border",
                    "p-[15px] pr-0 pl-0 gap-6 rounded-[5px] lg:flex-row lg:justify-center"
                )    
            }
        >
            { img }
            <h1 className="text-sm/[20px] font-medium text-center lg:text-left lg:text-base/[25px]">{ label }</h1>
        </div>
    );
}

export default function MiddleSection(){
    return (
        <section className="w-full flex flex-row justify-center gap-1 lg:gap-5 md:text-base">
            <Card
                label={ <>Experience <br/>and Expertise</> }
                img={ <Image src={ experience_svg } alt="Malex is experienced company"/> }
            />
            <Card
                label={ <>Personalized approach <br/>for every client</> }
                img={ <Image src={ client_svg } alt="Malex appreciates it's clients"/> }
            />
            <Card
                label={ <>Quality guarantee <br/>on all services</> }
                img={ <Image src={ certicate_svg } alt="Malex is experienced company"/> }
            />
        </section>        
    )
}