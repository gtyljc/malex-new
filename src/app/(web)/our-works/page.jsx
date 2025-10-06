
// components
import PathToPage from "@web/path-to-page/component";
import WorksPanel from "@web/works-panel/component";

export default async function Page() {
    return (
        <main>
            <PathToPage page_name="Our Works"/>
            <WorksPanel/>
        </main>
    )
}