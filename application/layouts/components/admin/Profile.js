
import { useContractRead, useContract, useContractWrite } from "@thirdweb-dev/react";
import { portfolio } from "const/contracts";
import Spinner from "../Spinner";
import { useEffect, useState } from "react";
const Profile = () => {
    const { contract } = useContract(portfolio);
    const { data, isLoading, error } = useContractRead(contract, "getAll");
    const { mutateAsync: setNameMutateAsync, isLoading: setNameIsLoading, error: setNameError } = useContractWrite(contract, "setName");
    const { mutateAsync: setEmailMutateAsync, isLoading: setEmailIsLoading, error: setEmailError } = useContractWrite(contract, "setEmail");

    const [profileName, setProfileName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (data) {
            setProfileName(data[0]);
            setEmail(data[4]);
        }
    }, [data])

    const updateProfileName = async () => {
        setNameMutateAsync({ args: [profileName] });
    }
    const updateEmail = async () => {
        setEmailMutateAsync({ args: [email] });
    }

    if (isLoading || setNameIsLoading || setEmailIsLoading) {
        return <Spinner />
    }

    return <section className="mt-10 pt-5">
        <h2>Your Profile Info</h2>
        <div className="mb-6 flex items-center mt-4">
            <label htmlFor="profileName" className="mr-2 w-40 text-lg font-semibold text-gray-900 dark:text-white">Profile Name</label>
            <input
                type="text"
                id="profileName"
                className="flex-grow shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="pankaj kumar"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                required
            />
            <button
                type="button"
                onClick={updateProfileName}
                className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Update Profile Name
            </button>
        </div>
        <div className="mb-6 flex items-center mt-4">
            <label htmlFor="email" className="mr-2 w-40 text-lg font-semibold text-gray-900 dark:text-white">Email Id</label>
            <input
                type="email"
                id="email"
                className="flex-grow shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="user@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button
                type="button"
                onClick={updateEmail}
                className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Update Email
            </button>
        </div>

    </section>
}

export default Profile;