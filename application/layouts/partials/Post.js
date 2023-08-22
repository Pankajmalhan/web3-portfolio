import config from "@config/config.json";
import ImageFallback from "@layouts/components/ImageFallback";
import dateFormat from "@lib/utils/dateFormat";
import { MediaRenderer, useContract, useContractWrite, useStorage } from "@thirdweb-dev/react";
import { projects } from "const/contracts";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBuilding, FaCalendarTimes, FaExternalLinkAlt, FaExternalLinkSquareAlt, FaProjectDiagram, FaRProject, FaRegCalendar, FaUserAlt } from "react-icons/fa";

const Post = ({ ipfsUri, showDelete, id }) => {
  const storage = useStorage();
  const { contract } = useContract(projects);
  const [projectData, setProjectData] = useState({});
  const [organization, setOrganization] = useState("");
  const [environment, setEnvironment] = useState("");
  const [github, setGithub] = useState("");
  const [url, setUrl] = useState("");
  const [role, setRole] = useState("");
  const [duration, setDuration] = useState("");
  const { mutateAsync, isLoading, error } = useContractWrite(contract, "burn");

  useEffect(() => {
    if (ipfsUri) {
      downloadInfo();
    }
  }, [ipfsUri]);

  const downloadInfo = async () => {
    try {
      const response = await storage?.download(`ipfs://${ipfsUri.split("/ipfs/")[1]}`);
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

  const deleteProject = () => {
    mutateAsync({ args: [id] });
  }

  console.log(github);
  return (
    <div className="post">
      <div className="relative">
        {projectData.image && (
          <MediaRenderer alt="Project Image" className="rounded" width={405} height={208} src={projectData.image} />
        )}
      </div>
      <h3 className="h5 mb-2 mt-4">
        <Link
          href={"`/${blog_folder}/${post.slug}`"}
          className="block hover:text-primary"
        >
          {projectData.name}
        </Link>
      </h3>
      <ul className="flex items-center space-x-4">
        <li>
          <div
            className="inline-flex items-center font-secondary text-xs leading-3">
            <FaCalendarTimes className="mr-1.5" />
            {duration}
          </div>
        </li>
        {organization && <li>
          <Link
            target="_blank"
            href={organization}
            className="inline-flex items-center font-secondary text-xs leading-3">
            <FaBuilding className="mr-1.5" />
            {organization}
          </Link>
        </li>}
        {projectData.external_url && <li className="inline-flex items-center font-secondary text-xs leading-3">
          <Link
            className="inline-flex items-center font-secondary text-xs leading-3"
            target="_blank"
            href={projectData.external_url}>
            <FaExternalLinkAlt className="mr-1.5" />
            {projectData.external_url.length > 30 ? projectData.external_url.slice(0, 30) + "..." : url}
          </Link>
        </li>}
        {url && <li className="inline-flex items-center font-secondary text-xs leading-3">
          <Link
            className="inline-flex items-center font-secondary text-xs leading-3"
            target="_blank"
            href={projectData.external_url}>
            <FaProjectDiagram className="mr-1.5" />
            {url.length > 30 ? url.slice(0, 30) + "..." : url}
          </Link>
        </li>}
      </ul>
      <p className="mt-4">{projectData.description}</p>
      <div className="flex">
        <Link
          className="btn btn-outline-primary mt-4"
          href={"/${blog_folder}/${post.slug}"}>
          Find More
        </Link>
        {showDelete && <button
          type="button"
          onClick={deleteProject}
          className="text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-md px-5 py-2.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Delete
        </button>}
      </div>
    </div>
  );
};

export default Post;

