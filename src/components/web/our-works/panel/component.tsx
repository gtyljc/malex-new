
interface PanelButtonParams {
    href: string,
    text: string
}

function PanelButton({ href, text }: PanelButtonParams){
    return (
        <a href={ href } className="redirect-btn redirect-btn-white max-w-[230px]">
            <span>{ text }</span>
        </a>
    )
}

export default function PanelSection(){
    return (
        <section>
            <h1 className="section-title mb-[15px]">Our works</h1>
            <div className="flex flex-row gap-3">
                <PanelButton href="#plumbing" text="Plumbing" />
                <PanelButton href="#assembling" text="Assembling" />
                <PanelButton href="#mounting" text="Mounting" />
            </div>
        </section>        
    );
}