
import { useContractRead, useContract, useContractWrite, useStorage } from "@thirdweb-dev/react";
import { portfolio } from "const/contracts";
import Spinner from "../Spinner";
import { useEffect, useState } from "react";
import TextInput from "../TextInput";
import { MediaRenderer } from "@thirdweb-dev/react";
const Profile = () => {
    const { contract } = useContract(portfolio);
    const storage = useStorage();
    const { data, isLoading, error, refetch } = useContractRead(contract, "getAll");
    const { mutateAsync: setNameMutateAsync, isLoading: setNameIsLoading, error: setNameError } = useContractWrite(contract, "setName");
    const { mutateAsync: setEmailMutateAsync, isLoading: setEmailIsLoading, error: setEmailError } = useContractWrite(contract, "setEmail");
    const { mutateAsync: setTaglineMutateAsync, isLoading: setTaglineIsLoading, error: setTaglineError } = useContractWrite(contract, "setTagline");
    const { mutateAsync: setPhoneMutateAsync, isLoading: setPhoneIsLoading, error: setPhoneError } = useContractWrite(contract, "setPhone");

    const { mutateAsync: setResumeMutateAsync, isLoading: setResumeIsLoading, error: setResumeError } = useContractWrite(contract, "setResume");
    const { mutateAsync: setGithubMutateAsync, isLoading: setGithubIsLoading, error: setGithubError } = useContractWrite(contract, "setGithub");
    const { mutateAsync: setLinkedinMutateAsync, isLoading: setLinkedinIsLoading, error: setLinkedinError } = useContractWrite(contract, "setLinkedin");
    const { mutateAsync: setImageMutateAsync, isLoading: setImageIsLoading, error: setImageError } = useContractWrite(contract, "setImage");

    const [profileName, setProfileName] = useState("");
    const [email, setEmail] = useState("");
    const [tagLine, setTagLine] = useState("");
    const [phoneNo, setPhoneNo] = useState("");

    const [resumeLink, setResumeLink] = useState("");
    const [linkedIn, setLinkedIn] = useState("");
    const [github, setGithub] = useState("");
    const [profileImage, setProfileImage] = useState("");

    useEffect(() => {
        if (data) {
            setProfileName(data[0]);
            setEmail(data[4]);
            setResumeLink(data[3]);
            setProfileImage(data[2]);
            setPhoneNo(data[5]);
            setTagLine(data[6]);
            setGithub(data[7]);
            setLinkedIn(data[8]);
        }
    }, [data])

    const updateProfileName = async () => {
        setNameMutateAsync({ args: [profileName] });
    }

    const updateEmail = async () => {
        setEmailMutateAsync({ args: [email] });
    }

    const updateTagLine = async () => {
        setTaglineMutateAsync({ args: [tagLine] });
    }

    const updatePhoneNo = async () => {
        setPhoneMutateAsync({ args: [phoneNo] });
    }

    const updateResumeLink = async () => {
        setResumeMutateAsync({ args: [resumeLink] });
    }

    const updateGithub = async () => {
        setGithubMutateAsync({ args: [github] });
    }

    const updateLinkedin = async () => {
        setLinkedinMutateAsync({ args: [linkedIn] });
    }

    const uploadImage = async () => {
        const imageInput = document.getElementById('file');
        const imageFile = imageInput.files[0];
        if (imageFile.type === "image/jpeg" || imageFile.type === "image/png" || imageFile.type === "image/jpg" || imageFile.type === "image/gif" || imageFile.type === "image/svg") {
            const response = await storage?.upload(imageFile, { contentType: imageFile.type });
            if (response) {
                setImageMutateAsync({ args: [response] });
                const data = await refetch();
                setProfileImage(data[2]);
            }
        }
        else {
            alert("image is not valid")
        }
    }
    if (isLoading || setNameIsLoading || setEmailIsLoading || setTaglineIsLoading || setPhoneIsLoading) {
        return <Spinner />
    }

    return <>
        <section className="mt-10 pt-5">
            <h2>Your Profile Info</h2>
            <TextInput
                title="Profile Name"
                type="text"
                value={profileName}
                onChange={setProfileName}
                buttonText="Update Profile Name"
                placeholder={"John Doe"}
                onSubmit={updateProfileName} />
            <TextInput
                title="Email Id"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder={"user@gamil.com"}
                buttonText="Update Email"
                onSubmit={updateEmail} />
            <TextInput
                title="Tag Line"
                type="text"
                value={tagLine}
                onChange={setTagLine}
                placeholder={"I am a web developer"}
                buttonText="Update TagLine"
                onSubmit={updateTagLine} />
            <TextInput
                title="Phone Number"
                type="phone"
                value={phoneNo}
                onChange={setPhoneNo}
                placeholder={"+91 1234567890"}
                buttonText="Update Phone No"
                onSubmit={updatePhoneNo} />
            <div className="mb-6 flex items-center mt-4">
                <div className="w-1/2 mr-5">
                    <h3 className="mr-2 mb-4 text-lg font-semibold text-gray-900 dark:text-white">Current Profile Image</h3>
                    <MediaRenderer alt="Banner Image" className="mx-auto object-contain" width={200} height={200} src={profileImage} />
                </div>
                <div className="w-1/2 mr-5">
                    <div className="items-center justify-center w-full">
                        <h4 className="mr-2 mb-4 text-lg font-semibold text-gray-900 dark:text-white">Update Image</h4>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file" type="file" />
                        <div className="mb-6 flex items-center mt-4">
                            <button
                                type="button"
                                onClick={uploadImage}
                                className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Add Image
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </section>
        <section className="mt-10 pt-5">
            <h2>Resume Link</h2>
            <TextInput
                title="Resume"
                type="text"
                value={resumeLink}
                onChange={setResumeLink}
                placeholder={"https://resumelink.com"}
                buttonText="Resume(CV) Link"
                onSubmit={updateResumeLink} />
            <TextInput
                title="LinkedIn"
                type="text"
                value={linkedIn}
                onChange={setLinkedIn}
                placeholder={"https://www.linkedin.com/in/username/"}
                buttonText="LinkedIn Url"
                onSubmit={updateLinkedin} />
            <TextInput
                title="GitHub"
                type="text"
                value={github}
                placeholder={"https://github.com/username"}
                onChange={setGithub}
                buttonText="GitHub Url"
                onSubmit={updateGithub} />
        </section>
    </>
}

export default Profile;