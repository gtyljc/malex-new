
"use cache";

// others
import { FormProvider } from "@web/form/ctx";

// components
import PathToPageSection from "@web/path-to-page/component";
import TopSection from "./top/component";
import MiddleSection from "./middle/component";
import BottomSection from "./bottom/component";

export default function AboutUs() {    
    return (
        <FormProvider>
            <main className="leading-[33px]">
                <PathToPageSection pageName="About Us" />
                <TopSection/>
                <MiddleSection/>
                <BottomSection/>
            </main>
        </FormProvider>
    );
}