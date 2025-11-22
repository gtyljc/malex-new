
"use client";

// others
import Image from "next/image";
import { 
    PointsScrollbarProvider, 
    PointsScrollbarCtx 
} from "@web/points-scrollbar/ctx";
import { useContext } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_LIST_QUERY } from "@src/api-requests";

// components
import ScrollProgressBar from "@web/points-scrollbar/component";

function getImgLink(data){
    const items = data.works.data;

    return items.length != 0 ? items[0].img_url: null;
}

// is used by Work ( and no where else)
function getImg(data){
    const imgLink = getImgLink(data);

    return (
        imgLink ? (
            <Image 
                width={ 200 }
                height={ 200 }
                src={ imgLink } 
                alt="Our work"
                className="w-full"
            />
        ): 
        <div className="w-[200px] h-[200px] size-full bg-ice-blue"></div>
    )
}

function Work({ page }){
    const { data, error, loading } = useQuery(
        GET_LIST_QUERY("work", ["img_url"]), 
        { 
            variables: { 
                filter: {},
                pagination: {
                    perPage: 1,
                    page
                }
            } 
        }
    );

    return (
        <div className="w-[250px] h-[250px] flex flex-row items-center justify-center nth-[3]:hidden overflow-hidden">
            { loading && "Loading..." }
            { error && "Failed to get..." }
            { data && getImg(data) }
        </div>
    )
}

function WorksSector({ sector_i }){
    const WORKS_PER_SECTOR = 3;
    const works = [];

    for(let i = 0; i < WORKS_PER_SECTOR; i++){
        works.push(<Work page={ (sector_i  * WORKS_PER_SECTOR) + i + 1 }/>)
    }

    return (
        <li className="row-el flex flex-row gap-3 justify-center">
            { works }
        </li>
    )
}

function WorksRow(){
    const SECTORS_NUM = 3;
    const { index } = useContext(PointsScrollbarCtx);
    const rowGap = 20; // %
    const worksSectors = [];
    
    for (let i = 0; i < SECTORS_NUM; i++){
        worksSectors.push(<WorksSector sector_i={ i } />);
    }

    return (
        <ul 
            className="row"
            style={
                {
                    transform: `translateX(-${index * (100 + rowGap)}%)`,
                    gap: `${ rowGap }%`
                }
            }
        >
            { worksSectors }
        </ul>
    )
}

function WorksSectionContent(){
    return (
        <section className="flex flex-col items-center gap-8">
            <h1 className="text-2xl font-medium">Our Works</h1>
            <div className="row-con">
                <WorksRow />
            </div>
            <ScrollProgressBar p_num={ 3 }/>
            <a className="redirect-btn redirect-btn--white" href="/our-works">
                See all works
            </a>    
        </section>
    )
}

export default function WorksSection(){
    return (
        <PointsScrollbarProvider>
            <WorksSectionContent />
        </PointsScrollbarProvider>
    )
}
