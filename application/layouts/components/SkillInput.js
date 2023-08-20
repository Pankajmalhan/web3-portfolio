import { useState } from "react";

const SkillInput = (props) => {
    const [name, setName] = useState(props.name);
    const [level, setLevel] = useState(props.level);

    const updateName = (e) => {
        setName(e.target.value);
        props.updateInfo(props.id, e.target.name, e.target.value);
    }
    const updateLevel = (e) => {
        setLevel(e.target.value);
        props.updateInfo(props.id, e.target.name, e.target.value);
    }

    return <div className="mt-4" key={props.id}>
        <div className="mb-6 flex items-center mt-4">
            <input
                type="type"
                id="name"
                name="name"
                className="flex-grow mr-4 shadow-lg w-40% bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="C#, node.js, etc"
                value={name}
                onChange={(e) => updateName(e)}
            />
            <input
                type="number"
                min={1}
                max={10}
                id="level"
                name="level"
                className="flex-grow mr-4 shadow-lg w-40% bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="rate b/w 1-10"
                value={level}
                onChange={(e) => updateLevel(e)}
            />
            <button
                type="button"
                onClick={() => props.deleteSkill(props.id)}
                className="text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Delete
            </button>
        </div>

    </div>
}

export default SkillInput;