
// components
import PathToPage from "@/components/path-to-page/component";
import AboutUsTop from "@/components/about-us-top/component";
import AboutUsMiddle from "@/components/about-us-middle/component";
import AboutUsBottom from "@/components/about-us-bottom/component";

export default async function Page() {    
    return (
        <main style={{lineHeight: "33px"}}>
            <PathToPage page_name="About Us" />
            <AboutUsTop/>
            <AboutUsMiddle/>
            <AboutUsBottom/>
        </main>
    );
}