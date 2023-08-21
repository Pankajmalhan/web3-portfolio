import config from "@config/config.json";
import ImageFallback from "@layouts/components/ImageFallback";
import dateFormat from "@lib/utils/dateFormat";
import { MediaRenderer, useStorage } from "@thirdweb-dev/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegCalendar, FaUserAlt } from "react-icons/fa";

const Post = ({ ipfsUri }) => {
  console.log("nik", ipfsUri);
  const storage = useStorage();
  const [projectData, setProjectData] = useState({});
  const [organization, setOrganization] = useState("");

  useEffect(() => {
    if (ipfsUri) {
      downloadInfo();
    }
  }, [ipfsUri]);

  const downloadInfo = async () => {
    try {
      const response = await storage?.download(`ipfs://${ipfsUri}`);
      const data = await response._bodyBlob.text();
      if (data) {
        const projectData = JSON.parse(data);
        setProjectData(projectData);
      }
    } catch (err) {
      console.log("error in downloadInfo");
      console.log(err);
    }
  }

  console.log("nik", projectData);
  return (
    <div className="post">
      <div className="relative">
        {projectData.image && (
          <MediaRenderer alt="Project Image" className="rounded" width={405} height={208} src={projectData.image} />
        )}
        {/* <ul className="absolute top-3 left-2 flex flex-wrap items-center">
          {post.frontmatter.categories.map((tag, index) => (
            <li
              className="mx-2 inline-flex h-7 rounded-[35px] bg-primary px-3 text-white"
              key={"tag-" + index}
            >
              <Link
                className="capitalize"
                href={`/categories/${tag.replace(" ", "-")}`}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul> */}
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
          <Link
            className="inline-flex items-center font-secondary text-xs leading-3"
            href="/about"
          >
            <FaUserAlt className="mr-1.5" />
            {"author"}
          </Link>
        </li>
        <li className="inline-flex items-center font-secondary text-xs leading-3">
          <FaRegCalendar className="mr-1.5" />
          {projectData.duration}
        </li>
      </ul>
      <p>{projectData.description}</p>
      <Link
        className="btn btn-outline-primary mt-4"
        href={"/${blog_folder}/${post.slug}"}>
        Read More
      </Link>
    </div>
  );
};

export default Post;

