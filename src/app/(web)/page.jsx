
// components
import BannersSection from "@components/banners-section/component"
import WcuSection from "@components/wcu-section/component"
import ServicesSection from "@components/services-section/component"
import WorksSection from "@components/works-section/component"


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