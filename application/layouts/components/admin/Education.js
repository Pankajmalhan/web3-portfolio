import { useContract, useContractRead, useContractWrite, useStorage } from "@thirdweb-dev/react";
import { portfolio } from "const/contracts";
import { use, useEffect, useState } from "react";
import SkillInput from "../SkillInput";
import Spinner from "../Spinner";
import EducationForm from "../EducationForm";

const Education = ({ }) => {
    const { contract } = useContract(portfolio);
    const { data, isLoading, error, refetch } = useContractRead(contract, "getAllEducation");
    const { mutateAsync: setEducationMutateAsync, isLoading: setEducationIsLoading } = useContractWrite(contract, "addEducation");
    const { mutateAsync: deleteEducationMutateAsync, isLoading: deleteEducationIsLoading } = useContractWrite(contract, "deleteEducation");
    const { mutateAsync: updateEducationMutateAsync, isLoading: updateEducationIsLoading } = useContractWrite(contract, "updateEducation");
    const [educations, setEducations] = useState([]);
    
    useEffect(() => {
        if (data) {
            setEducations(data.map((item) => ({ ...item, isNew: false })));
        }
    }, [data]);

    if (isLoading || setEducationIsLoading || updateEducationIsLoading || deleteEducationIsLoading) {
        return <Spinner />
    }

    const addUpdateEducation = (id, isNew, instituteName, degreeName, year, percentage) => {
        if (degreeName && instituteName && year && parseInt(percentage)) {
            console.log(instituteName, degreeName, year, parseInt(percentage))
            updateEducationMutateAsync({ args: [id, instituteName, degreeName, year, parseInt(percentage)] });
        } else {
            alert("Please fill all the fields");
        }
    }

    const addEducation = (id, isNew, name, instituteName, year, percentage) => {
        try {
            if (name && instituteName && year && parseInt(percentage)) {
                setEducationMutateAsync({ args: [name, instituteName, year, parseInt(percentage)] });
            } else {
                alert("Please fill all the fields");
            }
        } catch (exp) {
            alert(exp)
        }
    }

    const deleteEducation = (id) => {
        deleteEducationMutateAsync({ args: [parseInt(id)] });
    }

    return <>
        <section className="mt-10 pt-5">
            <h2 className="mb-4">Share Your Education</h2>
            {educations.length > 0 && <span className="bg-green-100 text-green-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 mt-4">Already Added</span>}
            {educations.map((item, index) => <EducationForm id={index} {...item} addUpdateEducation={addUpdateEducation} deleteEducation={deleteEducation} />)}
            <br />
            <span className="bg-blue-100 text-blue-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 mt-4">Add New One</span>
            <EducationForm isNew={true} addUpdateEducation={addEducation} />
        </section>
    </>
}

export default Education;