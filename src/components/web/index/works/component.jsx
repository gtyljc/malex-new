
"use client";

// others
import Image from "next/image";
import { 
    PointsScrollbarProvider, 
    PointsScrollbarCtx 
} from "@web/points-scrollbar/ctx";
import { useContext } from "react";
import { useQuery } from "@apollo/client/react";
import { WorkQueries } from "@src/lib/apollo-clients/queries/frontend";
import { dayjs } from "@lib/dayjs";

// components
import ScrollProgressBar from "@web/points-scrollbar/component";
import LoadingSection from "@web/loading-section/component";

function EmptyWork(){
    return <div className="size-full bg-ice-blue"></div>
}

function Work({ work }){
    return (
        <div 
            className="
                size-[200px] flex flex-row items-center justify-center 
                nth-[3]:hidden overflow-hidden md:nth-[3]:flex md:size-[250px]
                lg:size-[300px] group relative
            "
        >
            <div 
                className="
                    inset-0 bg-linear-to-t from-graphite to-graphite/70 absolute
                    opacity-0 group-hover:opacity-100 transition-opacity duration-250 
                    ease-(--appearing-anim)
                "
            >        
            </div>
            {
                work && <div 
                    className="
                        flex flex-col gap-4 absolute bottom-[-20px] left-[20px] transition-transform
                         text-white group-hover:transform-[translateY(-35px)]
                    "
                >
                    <span className="select-none">{ dayjs(work.timestamp).format("DD.MM.YYYY") }</span>
                    <a href="/our-works" className="text-dodger-blue!">More</a>
                </div>
            }
            { 
                work ? <Image 
                    src={ work.img_url } 
                    alt="Our work" 
                    width={ 300 } 
                    height={ 300 } 
                />: <EmptyWork />
            }
        </div>
    )
}

function WorksSector({ offset, works, perSector }){
    const imgs = [];

    for(let i = 0; i < perSector; i++){
        imgs.push(<Work work={ works[offset + i] } key={ i } />)
    }

    return (
        <li className="row-el flex flex-row gap-3 justify-center">
            { imgs }
        </li>
    )
}

function WorksRow(){
    const perSector = 3;
    const sectorsNum = 3;
    const { data, loading } = useQuery(
        WorkQueries.newWorks(),
        { variables: { num: sectorsNum * 3 } }
    )
    const { index } = useContext(PointsScrollbarCtx);

    if (loading) return <LoadingSection />;

    const rowGap = 20; // %
    const sectors = [];
    let offset = 0;

    for (let i = 0; i < sectorsNum; i++){
        sectors.push(
            <WorksSector 
                offset={ offset } 
                works={ data.newWorks.data } 
                perSector={ perSector } 
                key={ i }
            />);
    
        offset += perSector - 1;
    }

    return (
        <ul
            className="row row-animation"
            style={
                {
                    transform: `translateX(-${index * (100 + rowGap)}%)`,
                    gap: `${ rowGap }%`
                }
            }
        >
            { sectors }
        </ul>
    )
}

function WorksSectionContent(){
    return (
        <section className="flex flex-col items-center gap-10">
            <h1 className="section-title">Our Works</h1>
            <div className="row-con">
                <WorksRow />
            </div>
            <ScrollProgressBar p_num={ 3 }/>
            <a className="redirect-btn redirect-btn-white max-w-[250px]" href="/our-works">
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
