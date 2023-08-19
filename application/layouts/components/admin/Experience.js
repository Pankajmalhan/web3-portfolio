import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { portfolio } from "const/contracts";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import ExperienceForm from "../ExperienceForm";

const Experience = ({ }) => {
    const { contract } = useContract(portfolio);
    const { data, isLoading, error, refetch } = useContractRead(contract, "getAllExperience");
    const { mutateAsync: setExperienceMutateAsync, isLoading: setExperienceIsLoading, error: setExperienceError } = useContractWrite(contract, "addExperience");
    const { mutateAsync: deleteExperienceMutateAsync, isLoading: deleteExperienceIsLoading, error: deleteExperienceError } = useContractWrite(contract, "deleteExperience");
    const { mutateAsync: updateExperienceMutateAsync, isLoading: updateExperienceIsLoading, error: updateExperienceError } = useContractWrite(contract, "updateExperience");
    const [experience, setExperience] = useState([]);

    useEffect(() => {
        if (data) {
            setExperience(data.map((item) => ({ ...item, isNew: false })));
        }
    }, [data]);

    if (isLoading || setExperienceIsLoading || updateExperienceIsLoading || deleteExperienceIsLoading) {
        return <Spinner />
    }

    const updateExperience = (id,  name, role, url, year) => {
        if (id>=0 && name && role && url && year) {
            updateExperienceMutateAsync({ args: [id,  name, role, url, year] });
        } else {
            alert("Please fill all the fields");
        }
    }

    const addExperience = (id, isNew,  name, role, url, year) => {
        if ( name && role && url && year) {
            setExperienceMutateAsync({ args: [name, role, url, year] });
        } else {
            alert("Please fill all the fields");
        }
    }

    const deleteExperience = (id) => {
        deleteExperienceMutateAsync({ args: [parseInt(id)] });
    }

    console.log({ experience })
    return <>
        <section className="mt-10 pt-5">
            <h2 className="mb-4">Share Your Experience</h2>
            {experience.length > 0 && <span className="bg-green-100 text-green-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 mt-4">Already Added</span>}
            {experience.map((item, index) => <ExperienceForm id={index} {...item} addExperience={updateExperience} deleteExperience={deleteExperience} />)}
            <br />
            <span className="bg-blue-100 text-blue-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 mt-4">Add New One</span>
            <ExperienceForm isNew={true} addExperience={addExperience} />
        </section>
    </>
}

export default Experience;