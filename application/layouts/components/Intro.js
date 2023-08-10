import ImageFallback from "@components/ImageFallback";
import Link from "next/link";
import { markdownify } from "@lib/utils/textConverter";
import { MediaRenderer } from "@thirdweb-dev/react";
import { useStorage } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

const Intro = ({ userInfo }) => {
    const [desc, setDesc] = useState("");
    const storage = useStorage();
    // destructuring items from config object
    
    const downloadInfo=async()=>{
        const response=await storage?.download(userInfo.description);
        console.log({response},response.body);
        const desc=await response._bodyBlob.text();
        if(desc){
            const data=JSON.parse(desc);
            setDesc(data.desc);
        }
    }
    console.log({desc});
    useEffect(() => {
        if (userInfo) {
           downloadInfo();
        }
    }, []);
    return (
        <section className="section banner relative pb-0">
            <ImageFallback
                className="absolute bottom-0 left-0 z-[-1] w-full"
                src={"/images/banner-bg-shape.svg"}
                width={1905}
                height={295}
                alt="banner-shape"
                priority
            />

            <div className="container">
                <div className="row flex-wrap-reverse items-center justify-center lg:flex-row">
                    <div className={"mt-12 text-center lg:mt-0 lg:text-left lg:col-6"}>
                        <div className="banner-title">
                            {markdownify(userInfo.name, "h1")}
                            {markdownify(userInfo.tagLine, "span")}
                        </div>
                        <Link
                            className="btn btn-primary mt-6"
                            href={userInfo.resume}
                            target={"_blank"}
                            rel={"banner.button.rel"}>
                            Download Resume
                        </Link>
                    </div>
                    <div className="col-9 lg:col-6">
                        <MediaRenderer alt="Banner Image" className="mx-auto object-contain" width={548} height={443} src={userInfo.profileImage} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Intro;
