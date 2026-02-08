
// others
import clsx from "clsx"

// components
import LoadingIcon from "@web/loading-icon/component"

export default function LoadingSection({ styles, loadingIconStyles }){ // px
    return (
        <section className={ 
            clsx(
                "w-full h-full min-h-[200px] min-w-[200px] flex flex-row justify-center items-center m-0!", 
                styles
            ) 
        }>
            <LoadingIcon styles={ loadingIconStyles } />
        </section>
    )
}