
"use client";

// components
import BannersSection from "./banners/component";
import ServicesSection from "./services/component";
import WcuSection from "./wcu/component";
// import WorksSection from "./works/component";
import FormPreviewSection from "@web/form-preview/component";

export default function Index() {
    return (
        <main>
            <BannersSection/>
            <WcuSection/>
            <ServicesSection />
            {/* <WorksSection /> */}
            <FormPreviewSection />
        </main>
    )
}