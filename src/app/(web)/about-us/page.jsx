
// components
import PathToPage from "@components/web/path-to-page/component";
import AboutUsTop from "@components/web/about-us-top/component";
import AboutUsMiddle from "@components/web/about-us-middle/component";
import AboutUsBottom from "@components/web/about-us-bottom/component";

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