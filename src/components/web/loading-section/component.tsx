
// others
import clsx from "clsx"

// components
import LoadingIcon from "@web/loading-icon/component"

interface LoadingSectionParams {
    className?: string,
    loadingIconClassName?: string
}

export default function LoadingSection({ className, loadingIconClassName }: LoadingSectionParams){ // px
    return (
        <section className={ 
            clsx(
                "w-full h-full min-h-[200px] min-w-[200px] flex flex-row justify-center items-center m-0!", 
                className
            ) 
        }>
            <LoadingIcon className={ loadingIconClassName } />
        </section>
    )
}