
// components
import PathToPage from "@/components/path-to-page/component";
import WorksPanel from "@/components/works-panel/component";

export default async function Page() {
    return (
        <main>
            <PathToPage page_name="Our Works"/>
            <WorksPanel/>
        </main>
    )
}