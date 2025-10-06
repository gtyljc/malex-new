
// components
import PathToPage from "@web/path-to-page/component";
import AboutUsTop from "@web/about-us-top/component";
import AboutUsMiddle from "@web/about-us-middle/component";
import AboutUsBottom from "@web/about-us-bottom/component";

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