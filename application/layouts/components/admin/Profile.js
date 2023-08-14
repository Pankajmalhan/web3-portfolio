
import { useContractRead, useContract, useContractWrite } from "@thirdweb-dev/react";
import { portfolio } from "const/contracts";
import Spinner from "../Spinner";
import { useEffect, useState } from "react";
import TextInput from "../TextInput";
const Profile = () => {
    const { contract } = useContract(portfolio);
    const { data, isLoading, error } = useContractRead(contract, "getAll");
    const { mutateAsync: setNameMutateAsync, isLoading: setNameIsLoading, error: setNameError } = useContractWrite(contract, "setName");
    const { mutateAsync: setEmailMutateAsync, isLoading: setEmailIsLoading, error: setEmailError } = useContractWrite(contract, "setEmail");
    const { mutateAsync: setTaglineMutateAsync, isLoading: setTaglineIsLoading, error: setTaglineError } = useContractWrite(contract, "setTagline");
    const { mutateAsync: setPhoneMutateAsync, isLoading: setPhoneIsLoading, error: setPhoneError } = useContractWrite(contract, "setPhone");

    const { mutateAsync: setResumeMutateAsync, isLoading: setResumeIsLoading, error: setResumeError } = useContractWrite(contract, "setResume");
    const { mutateAsync: setGithubMutateAsync, isLoading: setGithubIsLoading, error: setGithubError } = useContractWrite(contract, "setGithub");
    const { mutateAsync: setLinkedinMutateAsync, isLoading: setLinkedinIsLoading, error: setLinkedinError } = useContractWrite(contract, "Linkedin");

    const [profileName, setProfileName] = useState("");
    const [email, setEmail] = useState("");
    const [tagLine, setTagLine] = useState("");
    const [phoneNo, setPhoneNo] = useState("");

    const [resumeLink, setResumeLink] = useState("");
    const [linkedIn, setLinkedIn] = useState("");
    const [github, setGithub] = useState("");

    useEffect(() => {
        if (data) {
            setProfileName(data[0]);
            setEmail(data[4]);
            setResumeLink(data[3]);
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