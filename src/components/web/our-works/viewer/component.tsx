
// others
import clsx from "clsx";
import { useContext } from "react";
import { ViewerCtx } from "./ctx";
import Image from "next/image";
import { WorksCtx } from "../component";
import { dayjs } from "@lib/dayjs";

// css
import styles from "./styles.module.css";

// images
import close from "./close.svg";
import next from "./next.svg";

interface ScrollBtnParams {
    className?: string
}

function ScrollForwardBtn({ className }: ScrollBtnParams) {
    const { sclForward, index } = useContext(ViewerCtx);
    const { works } = useContext(WorksCtx);

    return (
        <button 
            onClick={ () => sclForward } 
            className={ clsx(styles.scroll_btn, "right-0", index == works.length - 1 && "hidden!", className) }
        >
            <Image src={ next } alt="Scroll to next work" />
        </button>
    )
}

function ScrollBackBtn({ className }: ScrollBtnParams) {
    const { sclBack, index } = useContext(ViewerCtx);

    return (
        <button 
            onClick={ () => sclBack }
            className={ clsx(styles.scroll_btn, "left-0", index == 0 && "hidden!", className) }
        >
            <Image src={ next } alt="Scroll to previous work" className="rotate-180" />
        </button>
    )
}

export default function Viewer(){
    const { 
        isOpened, 
        closeViewer, 
        index
    } = useContext(ViewerCtx);
    const { works } = useContext(WorksCtx);

    return (
        <div 
            className={
                clsx(
                    isOpened && "opacity-100! pointer-events-auto!",
                    "bg-graphite/45",
                    styles.viewer
                )
            }
        >
            <div className="w-full max-w-[750px] flex flex-col justify-center pr-(--dft-content-p) pl-(--dft-content-p) box-border">
                <div className="w-full flex flex-row justify-end mb-4">
                    <button
                        className="flex flex-row justify-center items-center text-white text-base gap-2"
                        onClick={ () => closeViewer }
                        type="button"
                    >
                        <span>Close</span>
                        <Image 
                            src={ close } 
                            alt="Close Malex appointment window" 
                        />
                    </button>
                </div>
                <div className="w-full bg-white p-5 box-border rounded-[10px]">
                    <div className="flex flex-row justify-between items-end mb-6">
                        <h1 className="section-title">
                            { works.length != 0 && works[index].category }
                        </h1>
                        <span className="text-lg">
                            { works.length != 0 && dayjs(works[index].timestamp).format("DD.MM.YYYY") }
                        </span>
                    </div>
                    <div className="w-full flex flex-row justify-center rounded-[10px] overflow-hidden relative">
                        <ScrollBackBtn />
                        <ScrollForwardBtn />
                        {
                            works.length != 0 && <Image
                                src={ works[index].imgUrl }
                                alt="Opened work"
                                width={ 300 }
                                height={ 300 }
                                className="max-h-[720px]"
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}