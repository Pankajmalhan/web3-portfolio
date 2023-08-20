import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { portfolio } from "const/contracts";
import { useEffect, useState } from "react";
import Link from 'next/link';

const Projects = ({ }) => {
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
    return <>
        <section className="mt-10 pt-5">
            <h2 className="mb-4">Share Your Projects</h2>
            <div className="mb-6 flex items-center mt-4">
                <Link href="/admin/projects/add">
                    <button
                        type="button"
                        className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add Project
                    </button>
                </Link>

            </div>
        </section>
    </>
}

export default Projects;