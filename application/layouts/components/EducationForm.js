import { useState } from "react";

const EducationForm = (props) => {
    const [name, setName] = useState(props.degree);
    const [instituteName, setInstituteName] = useState(props.name);
    const [year, setYear] = useState(props.year);
    const [percentage, setPercentage] = useState(props.percentage);

    useEffect(() => {
        // Update the state when props change
        setName(props.degree);
        setInstituteName(props.instituteName);
        setYear(props.year);
        setPercentage(props.percentage);
    }, [props.degree, props.instituteName, props.year, props.percentage]);
    return <div key={props.name} className="mt-4 block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" key={props.id}>
        <div className="mb-6 flex items-center mt-4">
            <div className="w-1/2 mr-5">
                <h4 className="mr-2 mb-4 text-lg font-semibold text-gray-900 dark:text-white">Degree Name</h4>
                <input
                    type="type"
                    id="name"
                    name="name"
                    className="flex-grow mr-4 w-full shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="b.tech, secondary, sr. secondary, etc"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="w-1/2 mr-5">
                <h4 className="mr-2 mb-4 text-lg font-semibold text-gray-900 dark:text-white">Institute Name</h4>
                <input
                    type="type"
                    id="institute"
                    name="institute"
                    className="flex-grow mr-4 w-full shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="school, college, etc"
                    value={instituteName}
                    onChange={(e) => setInstituteName(e.target.value)}
                />
            </div>
        </div>
        <div className="mb-6 flex items-center mt-4">
            <div className="w-1/2 mr-5">
                <h4 className="mr-2 mb-4 text-lg font-semibold text-gray-900 dark:text-white">Year</h4>
                <input
                    type="number"
                    id="year"
                    name="year"
                    className="flex-grow mr-4 w-full shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="2018-2019"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
            </div>
            <div className="w-1/2 mr-5">
                <h4 className="mr-2 mb-4 text-lg font-semibold text-gray-900 dark:text-white">Percentage</h4>
                <input
                    type="number"
                    mix={0}
                    max={100}
                    id="percentage"
                    name="percentage"
                    className="flex-grow mr-4 w-full shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="80"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                />
            </div>
        </div>
        <div className="mb-6 flex items-center mt-4">
            {!props.isNew && <button
                type="button"
                onClick={() => props.deleteEducation(props.id)}
                className="text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Delete
            </button>}
            <button
                type="button"
                onClick={() => props.addUpdateEducation(props.id, props.isNew, instituteName,name, year, percentage)}
                className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {props.isNew ? "Save" : "Update"}
            </button>
        </div>
    </div>
}

export default EducationForm;