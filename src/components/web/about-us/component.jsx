
// components
import PathToPage from "@web/path-to-page/component";
import TopSection from "./top/component";
import MiddleSection from "./middle/component";
import BottomSection from "./bottom/component";

export default function AboutUs() {    
    return (
        <main style={ { lineHeight: "33px" } }>
            <PathToPage page_name="About Us" />
            <TopSection/>
            <MiddleSection/>
            <BottomSection/>
        </main>
    );
}