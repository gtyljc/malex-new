
"use client";

// others
import { useQuery } from "@apollo/client/react";
import { WorkQueries } from "@src/lib/apollo-clients/queries/frontend";
import { dayjs } from "@lib/dayjs";
import Image from "next/image";
import { ViewerProvider, ViewerCtx } from "./viewer/ctx";
import { useContext, createContext, useState } from "react";

// components
import PathToPageSection from "@web/path-to-page/component";
import PanelSection from "@web/our-works/panel/component";
import Viewer from "./viewer/component";
import LoadingSection from "@web/loading-section/component";

// images
import img_placeholder from "./img-placeholder.svg";

export const WorksCtx = createContext();

function ImagePlaceholder(){
    return (
        <div className="aspect-square max-w-[300px] w-full flex flex-row justify-center items-center rounded-[5px] bg-ice-blue">
            <Image
                width={ 64 }
                alt="Here must be our work"
                src={ img_placeholder }
            />
        </div>
    )
}

function EmptyCategory(){
    return (
        <div className="w-full flex flex-row gap-3">
            <ImagePlaceholder />
            <ImagePlaceholder />
            <ImagePlaceholder />
        </div>
    )
}

function Work({ date, img_url, index }){
    const { openViewer, setIndex } = useContext(ViewerCtx);

    return (
        <div 
            onClick={ () => { setIndex(index); openViewer(); } }
            className="
                size-[180px] relative rounded-[5px] overflow-hidden md:size-[220px] 
                lg:size-[250px] cursor-pointer flex flex-row justify-center items-center
            "
        >
            <Image
                className="absolute z-[-1]"
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
    const filteredWorks = works.filter(
        e => e.category == category
    ).map(
        e => <Work 
            date={ e.timestamp } 
            img_url={ e.img_url }
            index={ e.index }
        />
    );

    return (
        <section id={ category.toLowerCase() }>
            <h1 className="text-3xl mb-4">{ title }</h1>
            <div className="flex flex-row flex-wrap gap-3">
                { filteredWorks.length == 0 ? <EmptyCategory />: filteredWorks }
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
    if (loading) return <LoadingSection />;

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