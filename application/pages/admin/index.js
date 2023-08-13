import config from "@config/config.json";
import Base from "@layouts/Baseof";
import NoWallet from "@layouts/components/NoWallet";
import TabSection from "@layouts/components/TabSection";
import Profile from "@layouts/components/admin/Profile";
import { markdownify } from "@lib/utils/textConverter";
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
        </div>
      </section>
    </Base>
  );
};

export default Admin;

