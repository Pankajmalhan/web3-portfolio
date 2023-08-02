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
const { blog_folder, pagination } = config.settings;

const Home = ({
  banner,
  posts,
  featured_posts,
  recent_posts,
  categories,
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

  return (
    <Base>
      {/* Banner */}
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
            <div className={banner.image_enable ? "mt-12 text-center lg:mt-0 lg:text-left lg:col-6" : "mt-12 text-center lg:mt-0 lg:text-left lg:col-12"}>
              <div className="banner-title">
                {markdownify(banner.title, "h1")}
                {markdownify(banner.title_small, "span")}
              </div>
              {markdownify(banner.content, "p", "mt-4")}
              {banner.button.enable && (
                <Link
                  className="btn btn-primary mt-6"
                  href={banner.button.link}
                  rel={banner.button.rel}
                >
                  {banner.button.label}
                </Link>
              )}
            </div>
            {banner.image_enable && (
              <div className="col-9 lg:col-6">
                <ImageFallback
                  className="mx-auto object-contain"
                  src={banner.image}
                  width={548}
                  height={443}
                  priority={true}
                  alt="Banner Image"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section mt-16">
        <div className="container text-center">
          {markdownify(title, "h1", "h1 text-left lg:text-[55px] mt-12")}

          <div className="content text-left">
            <MDXRemote {...mdxContent} components={shortcodes} />
          </div>

          <div className="row mt-24 text-left lg:flex-nowrap">
            <div className="lg:col-6 ">
              <div className="rounded border border-border p-6 dark:border-darkmode-border ">
                {markdownify(education.title, "h2", "section-title mb-12")}
                <div className="row">
                  {education.degrees.map((degree, index) => (
                    <div className="mb-7 md:col-6" key={"degree-" + index}>
                      <h4 className="text-base lg:text-[25px]">
                        {degree.university}
                      </h4>
                      <p className="mt-2">{degree.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="experience mt-10 lg:mt-0 lg:col-6">
              <div className="rounded border border-border p-6 dark:border-darkmode-border ">
                {markdownify(experience.title, "h2", "section-title mb-12")}
                <ul className="row">
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
      <section className="section">
        <div className="container">
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

// for homepage data
export const getStaticProps = async () => {
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
      about:about
    },
  };
};
