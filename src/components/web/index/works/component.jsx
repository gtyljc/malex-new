
"use client";

// others
import Image from "next/image";
import { 
    PointsScrollbarProvider, 
    PointsScrollbarCtx 
} from "@web/points-scrollbar/ctx";
import { useContext } from "react";
import { useQuery } from "@apollo/client/react";
import { WorkQueries } from "@src/client-requests";

// components
import ScrollProgressBar from "@web/points-scrollbar/component";

function Empty(){
    return <div className="w-[200px] h-[200px] size-full bg-ice-blue"></div>
}

function Work({ work }){
    return (
        <div 
            className="
                w-[200px] h-[200px] flex flex-row items-center justify-center 
                nth-[3]:hidden overflow-hidden
            "
        >
            { 
                work ? <Image 
                    src={ work.img_url } 
                    alt="Our work" 
                    width={ 300 } 
                    height={ 300 } 
                />: <Empty />
            }
        </div>
    )
}

function WorksSector({ offset, works }){
    const worksPerSector = 3;
    const imgs = [];

    for(let i = 0; i < worksPerSector; i++){
        imgs.push(<Work work={ works[offset + i] } />)
    }

    return (
        <li className="row-el flex flex-row gap-3 justify-center">
            { imgs }
        </li>
    )
}

function WorksRow(){
    const sectorsNum = 3;
    const { data, loading } = useQuery(
        WorkQueries.newWorks(),
        { variables: { num: sectorsNum * 3 } }
    )
    const { index } = useContext(PointsScrollbarCtx);

    if (loading) return;

    const rowGap = 20; // %
    const worksSectors = [];
    let offset = 0;

    for (let i = 0; i < 3; i++){
        worksSectors.push(<WorksSector offset={ offset } works={ data.newWorks.data } />);

        offset += sectorsNum;
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
        <section className="flex flex-col items-center gap-7">
            <h1 className="section-title">Our Works</h1>
            <div className="row-con">
                <WorksRow />
            </div>
            <ScrollProgressBar p_num={ 3 }/>
            <a className="redirect-btn redirect-btn-white " href="/our-works">
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
