import { useContract, useContractRead, useContractWrite, useStorage } from "@thirdweb-dev/react";
import { portfolio } from "const/contracts";
import { use, useEffect, useState } from "react";
import SkillInput from "../SkillInput";
import Spinner from "../Spinner";

const DescSkills = ({ }) => {
    const [desc, setDesc] = useState("");
    const { contract } = useContract(portfolio);
    const { data, isLoading: getAllIsLoading, error } = useContractRead(contract, "getAll");
    const { mutateAsync: setDescriptionMutateAsync, isLoading: setDescriptionIsLoading, error: setDescriptionError } = useContractWrite(contract, "setDescription");
    const [skills, setSkill] = useState([]);
    const storage = useStorage();
    const [isLoading, setIsLoading] = useState(false);
    const downloadInfo = async (ipfsUrl) => {
        try {
            const response = await storage?.download(ipfsUrl);
            const desc = await response._bodyBlob.text();
            if (desc) {
                const data = JSON.parse(desc);
                setDesc(data.desc);
                setSkill(data.skills);
            }
        } catch (err) {
            console.log("error in downloadInfo");
            console.log(err);
        }
    }

    useEffect(() => {
        if (data) {
            downloadInfo(data[1]);
        }
    }, [data, data[1]]);

    const addMoreSkill = () => {
        const lastSkill = skills[skills.length - 1];
        if (skills.length === 0 || lastSkill?.name) {
            skills.push({ id: Date.now(), name: "", level: 1 });
            setSkill(skills);
        }
    }
    const updateInfo = (id, name, value) => {
        const skill = skills.find((item) => item.id === id);
        skill[name] = value;
        setSkill(skills);
    }

    const deleteSkill = (id) => {
        const newSkills = skills.filter((item) => item.id !== id);
        setSkill(newSkills);
    }

    const uploadFile = async () => {
        try {
            setIsLoading(true);
            const dataToUpload = { desc, skills };
            const response = await storage?.upload(JSON.stringify(dataToUpload), { contentType: "application/json" });
            setDescriptionMutateAsync({ args: [response] });
        } catch (exp) {
            console.log("error in uploadFile");
            console.log(exp);
        }
        finally {
            setIsLoading(false);
            downloadInfo();
        }
    }


    if (isLoading || setDescriptionIsLoading) {
        return <Spinner />
    }

    return <>
        <section className="mt-10 pt-5">
            <h2>Update Your Description and Skill Set</h2>
            <div className="mt-4">
                <h3 className="mr-2 mb-4 text-lg font-semibold text-gray-900 dark:text-white">Write About Yourself</h3>
                <textarea
                    value={desc}
                    placeholder={"write something about your self"}
                    id="message"
                    rows="10"
                    onChange={(e) => setDesc(e.target.value)}
                    className=" shadow-lg text-lg mt-4 block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
            </div>
            <div className="mt-4">
                <h3 className="mr-2 mb-4 text-lg font-semibold text-gray-900 dark:text-white">Update Your Skills</h3>
                {skills.map((item, i) => <SkillInput {...item} key={item.id} updateInfo={updateInfo} deleteSkill={deleteSkill} />)}
                <button
                    type="button"
                    onClick={addMoreSkill}
                    className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Add More
                </button>
                <button
                    type="button"
                    onClick={uploadFile}
                    className="text-white bg-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Update Desc and Skills
                </button>
            </div>
        </section>
    </>
}

export default DescSkills;