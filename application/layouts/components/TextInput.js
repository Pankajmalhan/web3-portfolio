const TextInput = ({ title, type, value, onChange, buttonText, onSubmit,placeholder }) => {
    return <div className="mb-6 flex items-center mt-4">
        <label htmlFor={title} className="mr-2 w-40 text-lg font-semibold text-gray-900 dark:text-white">{title}</label>
        <input
            type={type}
            id={title}
            className="flex-grow shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required
        />
        <button
            type="button"
            onClick={onSubmit}
            className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {buttonText}
        </button>
    </div>
}

export default TextInput;