import { useContract, useContractRead, useContractWrite, useStorage } from "@thirdweb-dev/react";
import { portfolio } from "const/contracts";
import { useEffect, useState } from "react";
import Base from "@layouts/Baseof";
import { useRouter } from 'next/router';
const AddProject = ({ }) => {
    const router = useRouter();
    const { contract } = useContract(portfolio);
    const { data, isLoading, error, refetch } = useContractRead(contract, "getAllExperience");
    const storage = useStorage();
    const { mutateAsync: setExperienceMutateAsync, isLoading: setExperienceIsLoading, error: setExperienceError } = useContractWrite(contract, "addExperience");
    const { mutateAsync: deleteExperienceMutateAsync, isLoading: deleteExperienceIsLoading, error: deleteExperienceError } = useContractWrite(contract, "deleteExperience");
    const { mutateAsync: updateExperienceMutateAsync, isLoading: updateExperienceIsLoading, error: updateExperienceError } = useContractWrite(contract, "updateExperience");
    const [experience, setExperience] = useState([]);
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [organization, setOrganization] = useState("");
    const [url, setUrl] = useState("");
    const [environment, setEnvironment] = useState("");
    const [github, setGithub] = useState("");
    const [description, setDescription] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        if (data) {
            setExperience(data.map((item) => ({ ...item, isNew: false })));
        }
    }, [data]);

    const updateExperience = (id, name, role, url, year) => {
        if (id >= 0 && name && role && url && year) {
            updateExperienceMutateAsync({ args: [id, name, role, url, year] });
        } else {
            alert("Please fill all the fields");
        }
    }

    const addExperience = async (id, isNew, name, role, url, year) => {
        if (name && role && url && year) {
            setExperienceMutateAsync({ args: [name, role, url, year] });
            const data = await refetch();
            setExperience([...data.map((item) => ({ ...item, isNew: false }))]);
        } else {
            alert("Please fill all the fields");
        }
    }

    const deleteExperience = (id) => {
        deleteExperienceMutateAsync({ args: [parseInt(id)] });
    }
    const handleGoBack = () => {
        router.back(); // Navigates back to the previous page
    };

    const saveProject = async () => {
        const imageInput = document.getElementById('file');
        const imageFile = imageInput.files[0];
        console.log(imageFile)
        if (name && description && duration && organization && environment && imageFile) {
            if (imageFile.type === "image/jpeg" || imageFile.type === "image/png" || imageFile.type === "image/jpg" || imageFile.type === "image/gif" || imageFile.type === "image/svg") {
                console.log("uploading project image to ipfs")
                const response = await storage?.upload(imageFile, { contentType: imageFile.type });
                if (response) {
                    console.log("uploading project metadata")
                    const metaData = {
                        name,
                        description,
                        image: response,
                        external_url: url,
                        attributes: [{
                            "trait_type": "Github",
                            "value": "github"
                        }, {
                            "trait_type": "Organization",
                            "value": organization
                        }, {
                            "trait_type": "Url",
                            "value": url
                        }, {
                            "trait_type": "Environment",
                            "value": environment
                        }]
                    }
                    const metaDataResponse = await storage?.upload(JSON.stringify(metaData), { contentType: "application/json" });
                    console.log(metaDataResponse)
                }
            } else {
                alert("image type is not valid")
            }

        } else {
            alert("please fill the information")
        }
    }

    return <Base isAdmin={true}>
        <div className="container">
            <section className="mt-10 pt-5">
                <div className="flex justify-between items-center">
                    <h2 className="mb-4">Add Your Projects</h2>
                    <div className="mb-6 flex items-center">
                        <button
                            type="button"
                            onClick={handleGoBack}
                            className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Back
                        </button>
                    </div>
                </div>
                <div className="mb-6 flex items-center mt-4">
                    <div className="w-1/2 mr-5">
                        <h4 className="mr-2 mb-4 text-lg font-semibold text-gray-900 dark:text-white">Project Name</h4>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="flex-grow mr-4 w-full shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="facebook.com"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="w-1/2 mr-5">
                        <h4 className="mr-2 mb-4 text-lg font-semibold text-gray-900 dark:text-white">Duration</h4>
                        <input
                            type="text"
                            id="duration"
                            name="duration"
                            className="flex-grow mr-4 w-full shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="feb 2022-may 2023"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mb-6 flex items-center mt-4">
                    <div className="w-1/2 mr-5">
                        <h4 className="mr-2 mb-4 text-lg font-semibold text-gray-900 dark:text-white">Organization</h4>
                        <input
                            type="text"
                            id="organization"
                            name="organization"
                            className="flex-grow mr-4 w-full shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="tftus.com"
                            value={organization}
                            onChange={(e) => setOrganization(e.target.value)}
                        />
                    </div>
                    <div className="w-1/2 mr-5">
                        <h4 className="mr-2 mb-4 text-lg font-semibold text-gray-900 dark:text-white">Url</h4>
                        <input
                            type="text"
                            id="url"
                            name="url"
                            className="flex-grow mr-4 w-full shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="facebook.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mb-6 flex items-center mt-4">
                    <div className="w-1/2 mr-5">
                        <h4 className="mr-2 mb-4 text-lg font-semibold text-gray-900 dark:text-white">Environment</h4>
                        <input
                            type="text"
                            id="environment"
                            name="environment"
                            className="flex-grow mr-4 w-full shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="C#, react .etc"
                            value={environment}
                            onChange={(e) => setEnvironment(e.target.value)}
                        />
                    </div>
                    <div className="w-1/2 mr-5">
                        <h4 className="mr-2 mb-4 text-lg font-semibold text-gray-900 dark:text-white">GitHub Link</h4>
                        <input
                            type="text"
                            id="github"
                            name="github"
                            className="flex-grow mr-4 w-full shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="github.com/projectid"
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mb-6 flex items-center mt-4">
                    <div className="w-1/2 mr-5">
                        <h3 className="mr-2 mb-4 text-lg font-semibold text-gray-900 dark:text-white">Project Description</h3>
                        <textarea
                            value={description}
                            placeholder={"write about the project"}
                            id="description"
                            rows="10"
                            onChange={(e) => setDescription(e.target.value)}
                            className=" shadow-lg text-lg mt-4 block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                    </div>
                    <div className="w-1/2 mr-5">
                        <h3 className="mr-2 mb-4 text-lg font-semibold text-gray-900 dark:text-white">Roles & Responsibilities</h3>
                        <textarea
                            value={role}
                            placeholder={"write about the role and responsbilities"}
                            id="role"
                            rows="10"
                            onChange={(e) => setRole(e.target.value)}
                            className=" shadow-lg text-lg mt-4 block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                    </div>
                </div>
                <div className="mb-6">
                    <div className="items-center justify-center w-full">
                        <h4 className="mr-2 mb-4 text-lg font-semibold text-gray-900 dark:text-white">Project Image</h4>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file" type="file" />

                    </div>

                </div>
                <div className="flex justify-between items-center">
                    <div className="mb-6 flex items-center">
                        <button
                            type="button"
                            onClick={saveProject}
                            className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Save The Project Info
                        </button>
                    </div>
                </div>
            </section>

        </div>
    </Base>
}

export default AddProject;