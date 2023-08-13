import AdminTabs from "const/misc";

const TabSection = ({ activeTab, setActiveTab }) => {
    const activeClass = "inline-block px-4 py-3 pl-20 pr-20 text-white bg-primary rounded-lg active";
    const notActiveClass = "inline-block px-4 py-3 pl-20 pr-20  rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white";

    return <div className="border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap text-sm font-medium text-center dark:text-gray-400  text-gray-500 border-b border-primary dark:border-primary">
            {AdminTabs.map((tab, i) => <li className="mr-2" key={i}>
                <a href="#" onClick={() => setActiveTab(tab.name)} className={tab.name === activeTab ? activeClass : notActiveClass} aria-current="page">{tab.name}</a>
            </li>)}
        </ul>
    </div>
}
export default TabSection;