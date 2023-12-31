import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Post from "@layouts/partials/Post";
import { getListPage, getRegularPage, getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import { sortByDate } from "@lib/utils/sortFunctions";
import { markdownify } from "@lib/utils/textConverter";
import portfolioService from "@lib/services/portfolio";
import Intro from "@layouts/components/Intro";
import { useContract, useContractRead, useStorage } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { portfolio, projects } from "const/contracts";
const { blog_folder, pagination } = config.settings;

const Home = ({
  banner,
  posts,
  featured_posts,
  recent_posts,
  userInfo,
  about,
}) => {
  // define state
  const sortPostByDate = sortByDate(posts);
  const featuredPosts = sortPostByDate.filter(
    (post) => post.frontmatter.featured
  );
  const showPosts = pagination;
  const { contract } = useContract(projects);
  const orderedPosts = sortByDate(posts);
  const currentPosts = orderedPosts.slice(0, 10);

  const { frontmatter, mdxContent } = about;
  const { title, image, education, experience } = frontmatter;

  const [desc, setDesc] = useState("");
  const [skills, setSkills] = useState([]);
  const storage = useStorage();
  const [allProject, setAllProjects] = useState([]);
  const { data, isLoading, error, refetch } = useContractRead(contract, "getAllTokenUris");
  const { contract: portfolioContract } = useContract(portfolio);
  const { data: educationList, isLoading: educationIsLoading, error: educationError, refetch: educationRefetch } = useContractRead(portfolioContract, "getAllEducation");
  const { data: ExperienceList, isLoading: ExperienceIsLoading, error: ExperienceError, refetch: ExperienceRefetch } = useContractRead(portfolioContract, "getAllExperience");

  useEffect(() => {
    if (data) {
      setAllProjects(data.filter(project => project));
    }
  }, [data]);

  // destructuring items from config object

  const downloadInfo = async () => {
    try {
      const response = await storage?.download(userInfo.description);
      const desc = await response._bodyBlob.text();
      if (desc) {
        const data = JSON.parse(desc);
        setDesc(data.desc);
        setSkills(data.skills);
      }
    } catch (err) {
      console.log("error in downloadInfo");
      console.log(err);
    }
  }

  useEffect(() => {
    if (userInfo) {
      downloadInfo();
    }
  }, []);

  console.log({ ExperienceList })
  return (
    <Base github={userInfo.github} linkedin={userInfo.linkedin} email={userInfo.email} phone={userInfo.phone} tagLine={userInfo.tagLine}>
      <Intro userInfo={userInfo} />
      <section className="section mt-0 pt-0">
        <div className="pl-12 pr-12">
          {markdownify(title, "h1", "h1 text-left lg:text-[55px] mt-12")}
          <div className="content text-left mt-4 mb-8 text-lg">
            {desc}
          </div>
          <div className="row items-start">
            <div className="mb-12 lg:mb-0 lg:col-12">
              {/* Recent Posts */}
              <div className="section pt-0 pb-0">
                <div className="rounded border border-border px-6 pt-6 dark:border-darkmode-border">
                  {markdownify("Education", "h2", "section-title")}
                  <div className="row">
                    {educationList?.map((education) => (
                      <div className="mb-8 md:col-4" key={education.degree}>
                        <a href="#" className="relative block max-w-sm p-6 bg-primary border border-gray-200 rounded-lg shadow group overflow-hidden">
                          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{education.degree}</h5>
                          <p className="font-normal text-gray-700 dark:text-gray-400 flex"><h6>Institute: &nbsp;</h6>{education.name}</p>
                          <p className="font-normal text-gray-700 dark:text-gray-400 flex"><h6>Year: &nbsp;</h6>{education.year}</p>
                          <p className="font-normal text-gray-700 dark:text-gray-400 flex"><h6>Percentage: &nbsp;</h6>{education.percentage}</p>
                        </a>

                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-24 text-left lg:flex-nowrap">
            <div className="lg:col-4 ">
              <div className="rounded border border-border p-6 dark:border-darkmode-border ">
                {markdownify(education.title, "h2", "section-title mb-12")}
                <div className="col">
                  {ExperienceList?.map((experience, index) => (
                    <div className="mb-12 md:col-12" key={"experience-" + index}>
                      <a href={experience.url} target="_blank" title>
                        <h4 className="text-base lg:text-[25px]">
                          {experience.name}
                        </h4>
                      </a>
                      <div className="flex">
                        <p className="mt-2 flex text-lg"><h6 style={{ marginTop:'4px'}}>Designation:&nbsp;&nbsp;</h6> {`${experience.role}`}&nbsp;&nbsp;</p>
                        <p className="mt-2 flex text-lg"><h6 style={{ marginTop:'4px'}}>Duration:&nbsp;&nbsp;</h6> {`${experience.year}`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="experience mt-10 lg:mt-0 lg:col-8">
              <div className="rounded border border-border p-6 dark:border-darkmode-border ">
                {markdownify("Skills", "h2", "section-title mb-12")}
                {skills.map((item, i) => <div className="flex w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-3">
                  <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                    <div className="bg-primary text-xs font-medium text-blue-100 text-center p-0.8 pt-0.5 pb-0.5 leading-none rounded-full" style={{ width: `${item.level * 10}%`, fontWeight: '600', color: '#fff' }}>{item.name}</div>
                  </div>
                </div>)}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Home main */}
      <section className="sectio mt-0 pt-0">
        <div className="pl-12 pr-12">
          <div className="row items-start">
            <div className="mb-12 lg:mb-0 lg:col-12">
              {/* Recent Posts */}
              <div className="section pt-0">
                {markdownify(recent_posts.title, "h2", "section-title")}
                <div className="rounded border border-border px-6 pt-6 dark:border-darkmode-border">
                  <div className="row">
                    {allProject.map((ipfsUri) => (
                      <div className="mb-8 md:col-6 shadow-lg" key={ipfsUri}>
                        <Post ipfsUri={ipfsUri} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const data = await portfolioService.getAll();
  const userInfo = { name: data[0], tagLine: data[6], profileImage: data[2], description: data[1], resume: data[3], email: data[4], phone: data[5], github: data[7], linkedin: data[8] }
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { banner, featured_posts, recent_posts, promotion } = frontmatter;
  const posts = getSinglePage(`content/${blog_folder}`);
  const categories = getTaxonomy(`content/${blog_folder}`, "categories");

  const categoriesWithPostsCount = categories.map((category) => {
    const filteredPosts = posts.filter((post) =>
      post.frontmatter.categories.includes(category)
    );

    return {
      name: category,
      posts: filteredPosts.length,
    };
  });

  const about = await getRegularPage("about");
  return {
    props: {
      banner: banner,
      posts: posts,
      featured_posts,
      recent_posts,
      promotion,
      categories: categoriesWithPostsCount,
      about: about,
      userInfo
    },
  };
}

