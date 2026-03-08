
"use cache";

// others
import Image from "next/image";

// images
import thumbnail from "./thumbnail.jpg";

export default function BottomSection(){
    return (
        <section className="w-full flex flex-col items-center gap-8 md:text-base lg:flex-row lg:gap-[70px]">
            <div className="w-full flex flex-col justify-center items-center md:order-2">
                <div  className="overflow-hidden rounded-[10px]">
                    <Image src={ thumbnail } alt="Malex it's your " />
                </div>
            </div>
            <div className="w-full flex flex-col gap-[25px]">
                <p>
                    Our goal is not just to get the job done but to exceed your expectations. 
                    We use only high-quality materials and modern tools to ensure the durability and safety of all completed work.
                </p>
                <p>
                    Malex Handyman is your trusted partner for all your home repair and handyman needs. 
                    We’re here to help you save time and effort by taking care of all the work, whether it’s small repairs or complex installations.
                </p>
            </div>
        </section>
    );
}