
// others
import Link from "next/link";
import Image from "next/image";

// images
import arrow from "./arrow.svg";

export default function PathToPageSection({ page_name }) {
    return (
        <section className="flex flex-row items-center gap-5 p-4.5 box-border bg-ice-blue rounded-[5px]">
            <Link className="text-sm text-medium" href="/">Home</Link>
            <Image
                src={ arrow }
                alt="Path from main page"
            />
            <h1 className="text-sm text-light-gray">{ page_name }</h1>
        </section>
    )
}