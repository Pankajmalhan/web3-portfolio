import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { projects } from "const/contracts";
import { useEffect, useState } from "react";
import Link from 'next/link';
import Post from "@layouts/partials/Post";
import { markdownify } from "@lib/utils/textConverter";

const ProjectDashBoard = ({ }) => {
    const { contract } = useContract(projects);
    const address = useAddress();
    const { data, isLoading, error, refetch } = useContractRead(contract, "getAllTokenUris");
    const [allProject, setAllProjects] = useState([]);
    useEffect(() => {
        if (data) {
            setAllProjects(data.map((uri, index) => ({ uri, id:index })).filter(project => project.uri));
        }
    }, [data]);
    return <>
        <section className="mt-10 pt-5">
            <h2 className="mb-4">Share Your Projects</h2>
            <div className="mb-6 flex items-center mt-4">
                <Link href="/admin/projects/add">
                    <button
                        type="button"
                        className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add Project
                    </button>
                </Link>
            </div>
            <section className="sectio mt-0 pt-0">
                <div className="pl-12 pr-12">
                    <div className="row items-start">
                        <div className="mb-12 lg:mb-0 lg:col-12">
                            {/* Recent Posts */}
                            <div className="section pt-0">
                                {markdownify("Existing Projects", "h2", "section-title")}
                                <div className="rounded border border-border px-6 pt-6 dark:border-darkmode-border">
                                    <div className="row">
                                        {allProject.map((project) => (
                                            <div className="mb-8 md:col-6" key={project.uri}>
                                                <Post ipfsUri={project.uri} id={project.id} showDelete={true} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    </>
}

export default ProjectDashBoard;