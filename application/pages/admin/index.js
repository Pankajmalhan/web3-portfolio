import config from "@config/config.json";
import Base from "@layouts/Baseof";
import NoWallet from "@layouts/components/NoWallet";
import TabSection from "@layouts/components/TabSection";
import Education from "@layouts/components/admin/Education";
import Experience from "@layouts/components/admin/Experience";
import Profile from "@layouts/components/admin/Profile";
import DescSkills from "@layouts/components/admin/Skill";
import Projects from "@layouts/components/admin/projects";
import { useAddress, useChain, useConnectionStatus, useNetwork, useNetworkMismatch } from "@thirdweb-dev/react";
import { useState } from "react";
const { blog_folder, summary_length } = config.settings;

// blog pagination
const Admin = () => {
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
  return (
    <Base isAdmin={true}>
      <section className="section">
        <div className="container">
          {address && <TabSection activeTab={activeTab} setActiveTab={setActiveTab} />}
          {activeTab === "Profile" && <Profile />}
          {activeTab === "About & Skill" && <DescSkills />}
          {activeTab === "Education" && <Education />}
          {activeTab === "Experience" && <Experience />}
          {activeTab === "Projects" && <Projects />}
        </div>
      </section>
    </Base>
  );
};

export default Admin;

