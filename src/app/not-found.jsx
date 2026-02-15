
import WebLayout from "./(web)/layout"
import Link from "next/link"

export default async function NotFound(){
    return (
        <WebLayout>
            <section className="grow flex flex-col justify-center items-center">
                <div className="flex flex-col gap-6 items-center">
                    <h1 className="text-7xl mb-8">4<span className="text-dodger-blue">0</span>4</h1>
                    <p>We are so sorry, but here is nothing for you yet...</p>
                </div>
                <Link
                    href="/"
                    className="redirect-btn redirect-btn-white  mt-8 min-[450px]:max-w-[250px]"
                >
                    <span>Back to Home</span>
                </Link>
            </section>
        </WebLayout>
    )
}