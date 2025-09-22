
// components
import BannersSection from "@/components/banners-section/banners-section"
import WcuSection from "@/components/wcu-section/wcu-section"
import ServicesSection from "@/components/services-section/services-section"
import WorksSection from "@/components/works-section/works-section"

export default function Page() {
    return (
        <main>
            <BannersSection/>
            <WcuSection/>
            <ServicesSection/>
            <WorksSection/>
        </main>
    )
}