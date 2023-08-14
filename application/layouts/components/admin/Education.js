import { useContract, useContractRead, useContractWrite, useStorage } from "@thirdweb-dev/react";
import { portfolio } from "const/contracts";
import { use, useEffect, useState } from "react";
import SkillInput from "../SkillInput";
import Spinner from "../Spinner";
import EducationForm from "../EducationForm";

const Education = ({ }) => {
    const [desc, setDesc] = useState("");
    const { contract } = useContract(portfolio);
    const { data, isLoading, error } = useContractRead(contract, "getAllEducation");
    const { mutateAsync: setDescriptionMutateAsync, isLoading: setDescriptionIsLoading, error: setDescriptionError } = useContractWrite(contract, "setDescription");
    const [educations, setEducations] = useState([]);

    useEffect(() => {
        if (data) {
            setEducations(data.map((item) => ({ ...item, isNew: false })));
        }
    }, [data]);

    if (isLoading || setDescriptionIsLoading) {
        return <Spinner />
    }

    const addMore = () => {
        const lastEducation = educations[educations.length - 1];
        console.log({ lastEducation });
        if (lastEducation.length === 0 || (lastEducation?.name && lastEducation?.degree && lastEducation?.year && lastEducation?.percentage)) {
            educations.push({ name: "", instituteName: "", year: "", setPercentage: 0, isNew: true });
            setEducations(educations);
        }
    }

    return <>
        <section className="mt-10 pt-5">
            <h2>Share Your Education</h2>
            {educations.map((item, index) => <EducationForm {...item} />)}
            <div className="mt-4">
                <button
                    type="button"
                    onClick={addMore}
                    className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Add More
                </button>
            </div>
        </section>
    </>
}

export default Education;