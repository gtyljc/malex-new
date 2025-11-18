
"use client";

// others
import { useQuery } from "@apollo/client/react";
import {
    GET_LIST_QUERY
} from "@src/api-requests";
import dayjs from "dayjs";
import Image from "next/image";

// components
import PathToPageSection from "@web/path-to-page/component";
import PanelSection from "@web/our-works/panel/component";

// css
import styles from "./styles.module.css";

function Work({ date, img_url }){
    return (
        <div className={ styles.work }>
            <Image
                className={ styles.work_preview }
                src={ img_url }
                width={ 300 }
                height={ 300 }
            />
            <span>{ dayjs(date).format("DD.MM.YYYY") }</span>
        </div>
    )
}

function WorkSection({ title, category }){
    const works = [];
    let pageNum = 1;

    const { data, error, loading } = useQuery(
        GET_LIST_QUERY(
            "work",
            [
                "id",
                "img_urls",
                "timestamp"
            ]
        ),
        {
            variables: {
                filter: { where: { category } },
                pagination: {
                    page: pageNum,
                    perPage: 10
                },
                sort: {
                    field: "id",
                    order: "DESC"
                }
            }
        }
    );

    if (loading) return ;

    if (error) return ;

    for (let workData of data.works.data){
        works.push(<Work date={ workData.timestamp } img_url={ workData.img_urls[0] }/>)
    }

    return (
        <section className={ styles.works_section }>
            <h1>{ title }</h1>
            { works }
        </section>
    )
}

export default function OurWorks(){
    
    return (
        <main>
            <PathToPageSection page_name="Our Works"/>
            <PanelSection />
            <WorkSection title="Plumbing" category="PLUMBING"/>
        </main>
    )
}