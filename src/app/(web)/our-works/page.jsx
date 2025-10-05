
// components
import PathToPage from "@components/web/path-to-page/component";
import WorksPanel from "@components/web/works-panel/component";

export default async function Page() {
    return (
        <main>
            <PathToPage page_name="Our Works"/>
            <WorksPanel/>
        </main>
    )
}