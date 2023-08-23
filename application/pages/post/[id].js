import config from "@config/config.json";
import Base from "@layouts/Baseof";
import NoWallet from "@layouts/components/NoWallet";
import portfolioService from "@lib/services/portfolio";
import { MediaRenderer, useAddress, useChain, useConnectionStatus, useContract, useContractRead, useContractWrite, useNetwork, useNetworkMismatch, useStorage } from "@thirdweb-dev/react";
import { portfolio, projects } from "const/contracts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const { blog_folder, summary_length } = config.settings;
import Link from "next/link";
import { FaBuilding, FaCalendarTimes, FaExternalLinkAlt, FaExternalLinkSquareAlt, FaProjectDiagram, FaRProject, FaRegCalendar, FaUserAlt } from "react-icons/fa";

// blog pagination
const PostDetails = ({ userInfo }) => {
    const storage = useStorage();
    const { contract } = useContract(projects);
    const [projectData, setProjectData] = useState({});
    const [organization, setOrganization] = useState("");
    const [environment, setEnvironment] = useState("");
    const [github, setGithub] = useState("");
    const [url, setUrl] = useState("");
    const [role, setRole] = useState("");
    const [duration, setDuration] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (router.query.id) {
            downloadInfo();
        }
    }, [router.query.id]);

    const downloadInfo = async () => {
        try {
            const response = await storage?.download(`ipfs://${decodeURIComponent(router.query.id)}`);
            if (response) {
                const data = await response._bodyBlob.text();
                if (data) {
                    const projectData = JSON.parse(data);
                    if (projectData.attributes?.length) {
                        setGithub(projectData.attributes.find((x) => x.trait_type === "Github")?.value || "");
                        setOrganization(projectData.attributes.find((x) => x.trait_type === "Organization")?.value || "");
                        setEnvironment(projectData.attributes.find((x) => x.trait_type === "Environment")?.value || "");
                        setRole(projectData.attributes.find((x) => x.trait_type === "Role")?.value || "");
                        setDuration(projectData.attributes.find((x) => x.trait_type === "Duration")?.value || "");
                        setUrl(projectData.attributes.find((x) => x.trait_type === "Url")?.value || "");
                    }
                    setProjectData(projectData);
                }
            }

        } catch (err) {
            console.log("error in downloadInfo");
            console.log(err);
        }
    }

    const handleGoBack = () => {
        router.back(); // Navigates back to the previous page
    };
    return (
        <Base github={userInfo.github} linkedin={userInfo.linkedin} email={userInfo.email} phone={userInfo.phone} tagLine={userInfo.tagLine}>
            <div className="container shadow-lg p-4 mt-10">
                <section className="mt-10 pt-5">
                    <div className="flex justify-between items-center">
                        <h2 className="mb-4">Project Details</h2>
                        <div className="mb-6 flex items-center">
                            <button
                                type="button"
                                onClick={handleGoBack}
                                className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Back
                            </button>
                        </div>
                    </div>
                    <div className="post">
                        <div className="relative">
                            {projectData.image && (
                                <MediaRenderer alt="Project Image" className="rounded" width={405} height={208} src={projectData.image} />
                            )}
                        </div>
                        <h4 className="mb-4 mt-4 text-primary">Project Info</h4>
                        <h2 className="h5 mb-2 mt-4">
                            <Link
                                href={"`/${blog_folder}/${post.slug}`"}
                                className="block hover:text-primary">
                                {projectData.name}
                            </Link>
                        </h2>
                        <ul className="flex items-center space-x-4 text-lg">
                            <li>
                                <div
                                    className="inline-flex items-center font-secondary text-sm leading-3">
                                    <FaCalendarTimes className="mr-1.5" />
                                    {duration}
                                </div>
                            </li>
                            {organization && <li>
                                <Link
                                    target="_blank"
                                    href={organization}
                                    className="inline-flex items-center font-secondary text-sm leading-3">
                                    <FaBuilding className="mr-1.5" />
                                    {organization}
                                </Link>
                            </li>}
                            {projectData.external_url && <li className="inline-flex items-center font-secondary text-xs leading-3">
                                <Link
                                    className="inline-flex items-center font-secondary text-sm leading-3"
                                    target="_blank"
                                    href={projectData.external_url}>
                                    <FaExternalLinkAlt className="mr-1.5" />
                                    {projectData.external_url}
                                </Link>
                            </li>}
                            {url && <li className="inline-flex items-center font-secondary text-sm leading-3">
                                <Link
                                    className="inline-flex items-center font-secondary text-sm leading-3"
                                    target="_blank"
                                    href={projectData.external_url}>
                                    <FaProjectDiagram className="mr-1.5" />
                                    {url}
                                </Link>
                            </li>}
                        </ul>
                        <h4 className="mb-4 mt-4 text-primary">Project Description</h4>
                        <p className="mt-4 text-lg">{projectData.description}</p>

                        <h4 className="mb-4 mt-4 text-primary">Environment</h4>
                        <p className="mt-4 text-lg">{environment}</p>

                        <h4 className="mb-4 mt-4 text-primary">Roles & Responsibilities</h4>
                        <p className="mt-4 text-lg">{role}</p>
                    </div>
                </section>
            </div>
        </Base>
    );
};

export const getServerSideProps = async () => {
    const data = await portfolioService.getAll();
    const userInfo = { name: data[0], tagLine: data[6], profileImage: data[2], description: data[1], resume: data[3], email: data[4], phone: data[5], github: data[7], linkedin: data[8] };
    return {
        props: {
            userInfo
        },
    };
}
export default PostDetails;

