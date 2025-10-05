
// components
import BannersSection from "@components/web/banners-section/component"
import WcuSection from "@components/web/wcu-section/component"
import ServicesSection from "@components/web/services-section/component"
import WorksSection from "@components/web/works-section/component"


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