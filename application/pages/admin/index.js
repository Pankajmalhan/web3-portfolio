import config from "@config/config.json";
import Base from "@layouts/Baseof";
import NoWallet from "@layouts/components/NoWallet";
import TabSection from "@layouts/components/TabSection";
import Education from "@layouts/components/admin/Education";
import Experience from "@layouts/components/admin/Experience";
import Profile from "@layouts/components/admin/Profile";
import DescSkills from "@layouts/components/admin/Skill";
import ProjectDashBoard from "@layouts/components/admin/projects";
import portfolioService from "@lib/services/portfolio";
import { useAddress, useChain, useConnectionStatus, useContract, useContractRead, useNetwork, useNetworkMismatch } from "@thirdweb-dev/react";
import { portfolio } from "const/contracts";
import { useState } from "react";
const { blog_folder, summary_length } = config.settings;

// blog pagination
const Admin = ({ userInfo }) => {
  const address = useAddress();
  const isMismatched = useNetworkMismatch();
  const [activeTab, setActiveTab] = useState("Profile");
  if (!address || isMismatched) {
    return <Base isAdmin={true}>
      <section className="section">
        <div className="container">
          <NoWallet isMismatched={isMismatched} />
        </div>
      </section>
    </Base>
  }
  console.log(userInfo.github)
  return (
    <Base isAdmin={true} github={userInfo.github} linkedin={userInfo.linkedin} email={userInfo.email} phone={userInfo.phone} tagLine={userInfo.tagLine}>
      <section className="section">
        <div className="container">
          {address && <TabSection activeTab={activeTab} setActiveTab={setActiveTab} />}
          {activeTab === "Profile" && <Profile />}
          {activeTab === "About & Skill" && <DescSkills />}
          {activeTab === "Education" && <Education />}
          {activeTab === "Experience" && <Experience />}
          {activeTab === "Projects" && <ProjectDashBoard />}
        </div>
      </section>
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
export default Admin;

