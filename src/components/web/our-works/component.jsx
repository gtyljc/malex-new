
"use client";

// others
import { useQuery } from "@apollo/client/react";
import { WorkQueries } from "@src/apollo-clients/requests/frontend";
import dayjs from "dayjs";
import Image from "next/image";
import { ViewerProvider, ViewerCtx } from "./viewer/ctx";
import { useContext, createContext, useState } from "react";

// components
import PathToPageSection from "@web/path-to-page/component";
import PanelSection from "@web/our-works/panel/component";
import Viewer from "./viewer/component";

export const WorksCtx = createContext();

function Work({ date, img_url, index }){
    const { openViewer, setIndex } = useContext(ViewerCtx);

    return (
        <div 
            onClick={ () => { setIndex(index); openViewer(); } }
            className="
                size-[180px] relative rounded-[5px] overflow-hidden md:size-[220px] 
                lg:size-[250px] cursor-pointer
            "
        >
            <Image
                className="h-full absolute z-[-1]"
                src={ img_url }
                width={ 300 }
                height={ 300 }
                alt="Our work"
            />
            <span className="size-full flex flex-row items-end p-2.5 box-border text-white">
                { dayjs(date).format("DD.MM.YYYY") }
            </span>
        </div>
    )
}

function WorkSection({ title, category }){
    const { works } = useContext(WorksCtx);

    return (
        <section>
            <h1 className="text-2xl mb-2.5">{ title }</h1>
            <div className="flex flex-row flex-wrap gap-3">
                { works.length == 0 && <p>Here is nothing right now...</p> }
                {
                    works.filter(e => e.category == category).map(
                        e => <Work 
                            date={ e.timestamp } 
                            img_url={ e.img_url }
                            index={ e.index }
                        />
                    )
                }
            </div>
        </section>
    )
}

export default function OurWorks(){
    const [ works, setWorks ] = useState(null);
    const { data, loading } = useQuery(
        WorkQueries.getWorks(),
        {
            variables: {
                filter: {},
                pagination: {
                    page: 1,
                    perPage: 100
                }
            }
        }
    );

    // wait until data will be loaded
    if (loading) return <section><p>Loading...</p></section>;

    !works && setWorks(
        data.getWorks.data.map(
            (e, i) => (
                {
                    index: i,
                    img_url: e.img_url, 
                    timestamp: e.timestamp, 
                    category: e.category
                }
            )
        )
    );

    return (
        <main>
            <WorksCtx.Provider value={ { works, setWorks } }>
                <ViewerProvider>
                    <Viewer />
                    <PathToPageSection page_name="Our Works"/>
                    <PanelSection />
                    <WorkSection title="Plumbing" category="PLUMBING" />
                    <WorkSection title="Assembling" category="ASSEMBLING" />
                    <WorkSection title="Mounting" category="MOUNTING" />
                </ViewerProvider>
            </WorksCtx.Provider>
        </main>
    )
}