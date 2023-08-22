import Social from "@components/Social";
import config from "@config/config.json";
import menu from "@config/menu.json";
import social from "@config/social.json";
import ImageFallback from "@layouts/components/ImageFallback";
import Logo from "@layouts/components/Logo";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

const Footer = ({ github, linkedin, email, phone, tagLine }) => {
  const { copyright, footer_content } = config.params;
  return (
    <footer className="section relative mt-12 pt-[70px] pb-[50px]">
      <div className="container text-center">
        <div className="mb-6 inline-flex">
          <Logo />
        </div>
        {markdownify(tagLine, "p", "max-w-[638px] mx-auto")}
        <br />
        {/* social icons */}
        <div className="inline-flex">
          <Social source={{ github, linkedin,email,phone }} className="socials mb-12 justify-center" />
        </div>
        {/* copyright */}
        {markdownify(copyright, "p")}
      </div>
    </footer>
  );
};

export default Footer;
