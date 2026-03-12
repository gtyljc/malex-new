
export default async function TopSection(){
    return (
        <section className="md:text-base mb-[70px]!">
            <h1 className="mb-[50px] text-4xl font-medium">About Us</h1>
            <h2 className="mb-5 text-2xl">
                Welcome to <span className="">Malex Handyman!</span>
            </h2>
            <div className="flex flex-col gap-5 lg:flex-row">
                <div className="flex flex-col gap-5">
                    <p>
                        We provide a wide range of professional repair and installation services for your home or business. 
                        Our expert, <span className="text-dodger-blue font-medium">Alex Handyman</span>, brings years of experience in various repair fields, ensuring that all work is completed with precision and reliability.
                    </p>
                    <p>
                        No matter how complex the task, we are ready to help make your home more comfortable and functional. 
                        Contact us today, and Alex Handyman will get the job done quickly and reliably. 
                        We take pride in serving our clients with great attention to detail. 
                    </p>
                </div>
                <div className="flex flex-col gap-5">
                    <p>
                        We value your time and comfort, and our goal is to complete every task efficiently and effectively. 
                        Whether it's a small household repair, furniture assembly, plumbing services, or complex system installations, we're here to deliver top-notch service.
                    </p>
                    <p>
                        Alex Handyman handles a wide range of tasks, from small repairs to large-scale projects. 
                        We understand that every home and business is unique, which is why we offer flexible solutions tailored to your needs and budget.
                    </p>
                </div>
            </div>
        </section>
    )
}