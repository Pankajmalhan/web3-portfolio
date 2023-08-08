import config from "@config/config.json";
import Base from "@layouts/Baseof";
const { blog_folder, summary_length } = config.settings;

// blog pagination
const Admin = () => {
  return (
    <Base isAdmin={true}>
      <section className="section">
        <div className="container">
        </div>
      </section>
    </Base>
  );
};

export default Admin;

