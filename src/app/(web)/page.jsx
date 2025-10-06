
// components
import BannersSection from "@web/banners-section/component"
import WcuSection from "@web/wcu-section/component"
import ServicesSection from "@web/services-section/component"
import WorksSection from "@web/works-section/component"

export default async function Page() {    
    return (
        <main>
            <BannersSection/>
            <WcuSection/>
            <ServicesSection/>
            <WorksSection/>
        </main>
    )
}