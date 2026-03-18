
"use client";

// others
import { useQuery } from "@apollo/client/react";
import * as queries from "@lib/apollo-clients/queries";
import { dayjs } from "@lib/dayjs/client";
import Image from "next/image";
import { ViewerProvider, ViewerCtx } from "./viewer/ctx";
import { useContext, createContext, useState } from "react";
import * as types from "@lib/types";

// components
import PathToPageSection from "@web/path-to-page/component";
import PanelSection from "@web/our-works/panel/component";
import Viewer from "./viewer/component";
import LoadingSection from "@web/loading-section/component";

// images
import img_placeholder from "./img-placeholder.svg";

interface WorksCtx {
    setWorks: Function | undefined,
    works: types.PublicWorkType[] | undefined;
}

export const WorksCtx = createContext<WorksCtx>(
    {
        setWorks: undefined,
        works: undefined
    }
);

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

interface WorkParams {
    date: string,
    imgUrl: string,
    index: number
}

function Work({ date, imgUrl, index }: WorkParams){
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
                src={ imgUrl }
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

interface WorkSectionParams {
    title: string,
    category: types.WorkCategoryEnum
}

function WorkSection({ title, category }: WorkSectionParams){
    const { works } = useContext(WorksCtx);
    const filteredWorks = works.filter(e => e.category == category).map(
        (e, i) => <Work 
            date={ e.timestamp } 
            imgUrl={ e.img_url }
            index={ i }
            key={ i }
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
    const [ works, setWorks ] = useState<types.PublicWorkType[] | null>(null);
    const { loading } = useQuery(
        queries.GetWorksDocument,
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

    return (
        <main>
            <WorksCtx.Provider value={ { works, setWorks } }>
                <ViewerProvider>
                    <Viewer />
                    <PathToPageSection pageName="Our Works"/>
                    <PanelSection />
                    <WorkSection title="Plumbing" category={ types.WorkCategoryEnum.Plumbing } />
                    <WorkSection title="Assembling" category={ types.WorkCategoryEnum.Assembling } />
                    <WorkSection title="Mounting" category={ types.WorkCategoryEnum.Mounting } />
                </ViewerProvider>
            </WorksCtx.Provider>
        </main>
    )
}