import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import Pagination from "@layouts/components/Pagination";
import Post from "@layouts/partials/Post";
import Sidebar from "@layouts/partials/Sidebar";
import { getListPage, getRegularPage, getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import dateFormat from "@lib/utils/dateFormat";
import { sortByDate } from "@lib/utils/sortFunctions";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote";
import shortcodes from "@shortcodes/all";
import portfolioService from "@lib/services/portfolio";
import Intro from "@layouts/components/Intro";
import { useStorage } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

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

  const orderedPosts = sortByDate(posts);
  const currentPosts = orderedPosts.slice(0, 10);

  const { frontmatter, mdxContent } = about;
  const { title, image, education, experience } = frontmatter;

  const [desc, setDesc] = useState("");
  const storage = useStorage();
  // destructuring items from config object

  const downloadInfo = async () => {
    try {
      const response = await storage?.download(userInfo.description);
      const desc = await response._bodyBlob.text();
      if (desc) {
        const data = JSON.parse(desc);
        setDesc(data.desc);
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

  console.log({ mdxContent });
  return (
    <Base>
      <Intro userInfo={userInfo} />
      <section className="section mt-0 pt-0">
        <div className="pl-12 pr-12">
          {markdownify(title, "h1", "h1 text-left lg:text-[55px] mt-12")}
          <div className="content text-left mt-4 mb-8">
            {desc}
          </div>
          <div className="row items-start">
            <div className="mb-12 lg:mb-0 lg:col-12">
              {/* Recent Posts */}
              {recent_posts.enable && (
                <div className="section pt-0 pb-0">
                  <div className="rounded border border-border px-6 pt-6 dark:border-darkmode-border">
                    {markdownify("Education", "h2", "section-title")}
                    <div className="row">
                      {sortPostByDate.slice(0, 3).map((post) => (
                        <div className="mb-8 md:col-4" key={post.slug}>
                          <a href="#" className="relative block max-w-sm p-6 bg-primary border border-gray-200 rounded-lg shadow group overflow-hidden">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                          </a>

                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="row mt-24 text-left lg:flex-nowrap">
            <div className="lg:col-4 ">
              <div className="rounded border border-border p-6 dark:border-darkmode-border ">
                {markdownify(education.title, "h2", "section-title mb-12")}
                <div className="col">
                  {education.degrees.slice(0, 3).map((degree, index) => (
                    <div className="mb-12 md:col-12" key={"degree-" + index}>
                      <h4 className="text-base lg:text-[25px]">
                        {degree.university}
                      </h4>
                      <p className="mt-2">{degree.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="experience mt-10 lg:mt-0 lg:col-8">
              <div className="rounded border border-border p-6 dark:border-darkmode-border ">
                {markdownify(experience.title, "h2", "section-title mb-12")}
                <ul className="col">
                  {experience?.list?.map((item, index) => (
                    <li
                      className="mb-5 text-lg font-bold text-dark dark:text-darkmode-light lg:col-6"
                      key={"experience-" + index}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
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
              {recent_posts.enable && (
                <div className="section pt-0">
                  {markdownify(recent_posts.title, "h2", "section-title")}
                  <div className="rounded border border-border px-6 pt-6 dark:border-darkmode-border">
                    <div className="row">
                      {sortPostByDate.slice(0, showPosts).map((post) => (
                        <div className="mb-8 md:col-6" key={post.slug}>
                          <Post post={post} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
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
  const userInfo = { name: data[0], tagLine: data[6], profileImage: data[2], description: data[1], resume: data[3], email: data[4], phone: data[5] }
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
