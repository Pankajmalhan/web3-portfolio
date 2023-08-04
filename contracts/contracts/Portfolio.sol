// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
import "@openzeppelin/contracts/ownership/Ownable.sol";

contract Portfolio is Ownable {
    // Internal state to the contract
    address private _owner;

    // personal data
    string private _name;
    string private _description;
    string private _image;
    string private _resume;
    string private _email;
    string private _phone;
    string private _tagline;

    // scoial media data
    string private _github;
    string private _linkedin;

    // struct for education with name, degree, and year and percentage
    struct Education {
        string name;
        string degree;
        string year;
        uint percentage;
    }

    // struct for experience with name, role, url, and year
    struct Experience {
        string name;
        string role;
        string url;
        string year;
    }

    // struct for skills with name and rating and
    struct Skill {
        string name;
        uint rating;
    }

    // struct for projects with name, description, url, github ,year and image
    struct Project {
        string name;
        string description;
        string url;
        string github;
        string year;
        string image;
    }

    // array of Skill structs
    Skill[] private _skills;

    // array of Experience structs
    Experience[] private _experience;

    // array of Education structs
    Education[] private _education;

    Project[] private _projects;

    // Constructor - run when contract is deployed
    constructor() Ownable(msg.sender){
    }

    // Read function (can be called without a transaction)
    function getOwner() public view returns (address) {
        return _owner;
    }

    // Write function to update name
    function setName(string memory _newName) public onlyOwner {
        require(bytes(_newName).length > 0, "Name cannot be empty");
        require(
            keccak256(bytes(_name)) != keccak256(bytes(_newName)),
            "New name is the same as the current name"
        );
        _name = _newName;
    }

    // Read function to get name
    function getName() public view returns (string memory) {
        return _name;
    }

    // Write function to update description
    function setDescription(string memory _newDescription) public onlyOwner {
        require(
            bytes(_newDescription).length > 0,
            "Description cannot be empty"
        );
        // Optional: Check if the new description is different from the current description
        require(
            keccak256(bytes(_description)) != keccak256(bytes(_newDescription)),
            "New description is the same as the current description"
        );

        _description = _newDescription;
    }

    // Read function to get description
    function getDescription() public view returns (string memory) {
        return _description;
    }

    // Write function to update image
    function setImage(string memory _newImage) public onlyOwner {
        require(bytes(_newImage).length > 0, "Image URL cannot be empty");
        // Optional: Check if the length of the new image URL is within a certain range

        require(
            keccak256(bytes(_image)) != keccak256(bytes(_newImage)),
            "New image is the same as the current image"
        );

        require(
            bytes(_newImage).length <= 200,
            "Image URL length exceeds the maximum allowed length"
        );

        // Optional: Check if the image URL is valid (e.g., by checking it against a whitelist of trusted image sources)

        _image = _newImage;
    }

    // Read function to get image
    function getImage() public view returns (string memory) {
        return _image;
    }

    // Write function to update resume
    function setResume(string memory _newResume) public onlyOwner {
        require(bytes(_newResume).length > 0, "Resume content cannot be empty");
        // Optional: Check if the length of the new resume content is within a certain range

        require(
            keccak256(bytes(_resume)) != keccak256(bytes(_newResume)),
            "New resume is the same as the current resume"
        );

        require(
            bytes(_newResume).length <= 200,
            "Resume content length exceeds the maximum allowed length"
        );

        // Optional: Check if the resume content meets specific requirements (e.g., certain keywords, format, etc.)

        _resume = _newResume;
    }

    // Read function to get resume
    function getResume() public view returns (string memory) {
        return _resume;
    }

    // Write function to update email
    function setEmail(string memory _newEmail) public onlyOwner {
        require(bytes(_newEmail).length > 0, "Email address cannot be empty");
        // Optional: Check if the email address has a valid format

        require(
            keccak256(bytes(_email)) != keccak256(bytes(_newEmail)),
            "New email is the same as the current email"
        );

        require(isValidEmail(_newEmail), "Invalid email address format");

        _email = _newEmail;
    }

    // Optional: A simple email validation function (not suitable for all cases)
    function isValidEmail(string memory _email) internal pure returns (bool) {
        // Perform basic email format check here (e.g., check for '@' symbol and valid domain)
        // This example is just for demonstration purposes and is not exhaustive.
        bytes memory emailBytes = bytes(_email);
        bool hasAtSymbol = false;
        bool hasDot = false;
        for (uint i = 0; i < emailBytes.length; i++) {
            if (emailBytes[i] == "@") {
                hasAtSymbol = true;
            }
            if (emailBytes[i] == ".") {
                hasDot = true;
            }
        }
        return hasAtSymbol && hasDot;
    }

    // Read function to get email
    function getEmail() public view returns (string memory) {
        return _email;
    }


    // Optional: A simple validation for valid separators (not suitable for all cases)
    function isValidSeparator(bytes1 _char) internal pure returns (bool) {
        return (_char == "+" ||
            _char == "-" ||
            _char == "(" ||
            _char == ")" ||
            _char == " ");
    }

    function setPhone(string memory _newPhone) public onlyOwner {
        require(bytes(_newPhone).length > 0, "Phone number cannot be empty");

        require(
            keccak256(bytes(_phone)) != keccak256(bytes(_newPhone)),
            "New phone is the same as the current phone"
        );

        _phone = _newPhone;
    }

    // Read function to get phone
    function getPhone() public view returns (string memory) {
        return _phone;
    }

    // Write function to update tagline
    function setTagline(string memory _newTagline) public onlyOwner {
        require(bytes(_newTagline).length > 0, "Tagline cannot be empty");
        // Optional: Check if the length of the new tagline is within a certain range
        require(
            bytes(_newTagline).length <= 100,
            "Tagline length exceeds the maximum allowed length"
        );

        // Optional: Check if the tagline content meets specific requirements (e.g., certain keywords, format, etc.)

        _tagline = _newTagline;
    }

    // Read function to get tagline
    function getTagline() public view returns (string memory) {
        return _tagline;
    }

    // Write function to update github
    function setGithub(string memory _newGithub) public onlyOwner {
        require(
            bytes(_newGithub).length > 0,
            "GitHub username cannot be empty"
        );
        require(
            keccak256(bytes(_github)) != keccak256(bytes(_newGithub)),
            "New github is the same as the current github"
        );
        _github = _newGithub;
    }

    // Read function to get github
    function getGithub() public view returns (string memory) {
        return _github;
    }

    // Write function to update linkedin
    function setLinkedin(string memory _newLinkedin) public onlyOwner {
        require(
            bytes(_newLinkedin).length > 0,
            "LinkedIn profile URL cannot be empty"
        );
        require(
            keccak256(bytes(_linkedin)) != keccak256(bytes(_newLinkedin)),
            "New linkedin is the same as the current linkedin"
        );
        _linkedin = _newLinkedin;
    }

    // Read function to get linkedin
    function getLinkedin() public view returns (string memory) {
        return _linkedin;
    }

    // Write function to update all data
    function updateAll(
        string memory _newName,
        string memory _newDescription,
        string memory _newImage,
        string memory _newResume,
        string memory _newEmail,
        string memory _newPhone,
        string memory _newTagline,
        string memory _newGithub,
        string memory _newLinkedin
    ) public onlyOwner {
        if (bytes(_newName).length > 0) {
            require(
                keccak256(bytes(_name)) != keccak256(bytes(_newName)),
                "New name is the same as the current name"
            );
            _name = _newName;
        }

        if (bytes(_newDescription).length > 0) {
            require(
                keccak256(bytes(_description)) !=
                    keccak256(bytes(_newDescription)),
                "New description is the same as the current description"
            );
            _description = _newDescription;
        }

        if (bytes(_newImage).length > 0) {
            require(
                keccak256(bytes(_image)) != keccak256(bytes(_newImage)),
                "New image is the same as the current image"
            );
            _image = _newImage;
        }
        if (bytes(_newResume).length > 0) {
            require(
                keccak256(bytes(_resume)) != keccak256(bytes(_newResume)),
                "New resume is the same as the current resume"
            );
            require(
                bytes(_newResume).length <= 200,
                "Resume content length exceeds the maximum allowed length"
            );
            _resume = _newResume;
        }

        if (bytes(_newEmail).length > 0) {
            require(
                keccak256(bytes(_email)) != keccak256(bytes(_newEmail)),
                "New email is the same as the current email"
            );
            require(isValidEmail(_newEmail), "Invalid email address format");
            _email = _newEmail;
        }

        if (bytes(_newPhone).length > 0) {
            require(
                keccak256(bytes(_phone)) != keccak256(bytes(_newPhone)),
                "New phone is the same as the current phone"
            );

            _phone = _newPhone;
        }

        if (bytes(_newTagline).length > 0) {
            require(
                bytes(_newTagline).length <= 100,
                "Tagline length exceeds the maximum allowed length"
            );
            _tagline = _newTagline;
        }
        if (bytes(_newGithub).length > 0) {
            require(
                keccak256(bytes(_github)) != keccak256(bytes(_newGithub)),
                "New github is the same as the current github"
            );
            _github = _newGithub;
        }
        if (bytes(_newLinkedin).length > 0) {
            require(
                keccak256(bytes(_linkedin)) != keccak256(bytes(_newLinkedin)),
                "New linkedin is the same as the current linkedin"
            );
            _linkedin = _newLinkedin;
        }
    }

    // Write function to get all data
    function getAll()
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        return (
            _name,
            _description,
            _image,
            _resume,
            _email,
            _phone,
            _tagline,
            _github,
            _linkedin
        );
    }

    // Write function to add education
    function addEducation(
        string memory _name,
        string memory _degree,
        string memory _year,
        uint _percentage
    ) public onlyOwner {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_degree).length > 0, "Degree cannot be empty");
        require(bytes(_year).length > 0, "Year cannot be empty");

        // Validate Percentage
        require(
            _percentage >= 0 && _percentage <= 100,
            "Percentage must be between 0 and 100"
        );

        _education.push(Education(_name, _degree, _year, _percentage));
    }

    // Write function to get education
    function getEducation(
        uint256 _index
    )
        public
        view
        returns (string memory, string memory, string memory, uint)
    {
        return (
            _education[_index].name,
            _education[_index].degree,
            _education[_index].year,
            _education[_index].percentage
        );
    }

    // Write function to get education length
    function getEducationLength() public view returns (uint256) {
        return _education.length;
    }

    // Write function to update education
    function updateEducation(
        uint256 _index,
        string memory _name,
        string memory _degree,
        string memory _year,
        uint _percentage
    ) public onlyOwner {
        require(_index < _education.length, "Invalid index");
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_degree).length > 0, "Degree cannot be empty");
        require(bytes(_year).length > 0, "Year cannot be empty");

        // Validate Percentage
        require(
            _percentage >= 0 && _percentage <= 100,
            "Percentage must be between 0 and 100"
        );

        _education[_index].name = _name;
        _education[_index].degree = _degree;
        _education[_index].year = _year;
        _education[_index].percentage = _percentage;
    }

    // Write function to delete education
    function deleteEducation(uint256 _index) public onlyOwner {
        delete _education[_index];
    }

    // Write function to get all education
    function getAllEducation() public view returns (Education[] memory) {
        return _education;
    }

    // Write function to add experience
    function addExperience(
        string memory _name,
        string memory _role,
        string memory _url,
        string memory _year
    ) public onlyOwner {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_role).length > 0, "Role cannot be empty");
        require(bytes(_url).length > 0, "URL cannot be empty");
        require(bytes(_year).length > 0, "Year cannot be empty");
        _experience.push(Experience(_name, _role, _url, _year));
    }

    // Write function to get experience
    function getExperience(
        uint256 _index
    )
        public
        view
        returns (string memory, string memory, string memory, string memory)
    {
        return (
            _experience[_index].name,
            _experience[_index].role,
            _experience[_index].url,
            _experience[_index].year
        );
    }

    // Write function to get experience length
    function getExperienceLength() public view returns (uint256) {
        return _experience.length;
    }

    // Write function to update experience
    function updateExperience(
        uint256 _index,
        string memory _name,
        string memory _role,
        string memory _url,
        string memory _year
    ) public onlyOwner {
        require(_index < _experience.length, "Invalid index");
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_role).length > 0, "Role cannot be empty");
        require(bytes(_url).length > 0, "URL cannot be empty");
        require(bytes(_year).length > 0, "Year cannot be empty");

        _experience[_index].name = _name;
        _experience[_index].role = _role;
        _experience[_index].url = _url;
        _experience[_index].year = _year;
    }

    // Write function to delete experience
    function deleteExperience(uint256 _index) public onlyOwner {
        require(_index < _experience.length, "Invalid index");
        // Move the last element to the deleted index
        uint256 lastIndex = _experience.length - 1;
        _experience[_index] = _experience[lastIndex];

        // Clear the last element, making the array compact
        delete _experience[lastIndex];

        // Reduce the array length by one
        _experience.pop();
    }

    // Write function to get all experience
    function getAllExperience() public view returns (Experience[] memory) {
        return _experience;
    }

    // Write function to add skill
    function addSkill(string memory _name, uint _rating) public onlyOwner {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(
            _rating >= 1 && _rating <= 10,
            "Rating must be between 1 and 10"
        );
        _skills.push(Skill(_name, _rating));
    }

    // Write function to get skill
    function getSkill(
        uint256 _index
    ) public view returns (string memory, uint) {
        return (_skills[_index].name, _skills[_index].rating);
    }

    // Write function to get skill length
    function getSkillLength() public view returns (uint256) {
        return _skills.length;
    }

    // Write function to update skill
    function updateSkill(
        uint256 _index,
        string memory _name,
        uint _rating
    ) public onlyOwner {
        require(_index < _skills.length, "Invalid index");
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(
            _rating >= 1 && _rating <= 10,
            "Rating must be between 1 and 10"
        );

        _skills[_index].name = _name;
        _skills[_index].rating = _rating;
    }

    // Write function to delete skill
    function deleteSkill(uint256 _index) public onlyOwner {
        require(_index < _skills.length, "Invalid index");

        // Move the last element to the deleted index
        uint256 lastIndex = _skills.length - 1;
        _skills[_index] = _skills[lastIndex];

        // Clear the last element, making the array compact
        delete _skills[lastIndex];

        // Reduce the array length by one
        _skills.pop();
    }

    // Write function to get all skills
    function getAllSkills() public view returns (Skill[] memory) {
        return _skills;
    }

    // Write function to add project
    function addProject(
        string memory _name,
        string memory _description,
        string memory _url,
        string memory _github,
        string memory _year,
        string memory _image
    ) public onlyOwner {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(bytes(_url).length > 0, "URL cannot be empty");
        require(bytes(_github).length > 0, "Github URL cannot be empty");
        require(bytes(_year).length > 0, "Year cannot be empty");
        require(bytes(_image).length > 0, "Image URL cannot be empty");

        _projects.push(
            Project(_name, _description, _url, _github, _year, _image)
        );
    }

    // Write function to get project
    function getProject(
        uint256 _index
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        return (
            _projects[_index].name,
            _projects[_index].description,
            _projects[_index].url,
            _projects[_index].github,
            _projects[_index].year,
            _projects[_index].image
        );
    }

    // Write function to get project length
    function getProjectLength() public view returns (uint256) {
        return _projects.length;
    }

    // Write function to update project
    function updateProject(
        uint256 _index,
        string memory _name,
        string memory _description,
        string memory _url,
        string memory _github,
        string memory _year,
        string memory _image
    ) public onlyOwner {
        require(_index < _projects.length, "Invalid index");

        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(bytes(_url).length > 0, "URL cannot be empty");
        require(bytes(_github).length > 0, "Github URL cannot be empty");
        require(bytes(_year).length > 0, "Year cannot be empty");
        require(bytes(_image).length > 0, "Image URL cannot be empty");

        _projects[_index].name = _name;
        _projects[_index].description = _description;
        _projects[_index].url = _url;
        _projects[_index].github = _github;
        _projects[_index].year = _year;
        _projects[_index].image = _image;
    }

    // Write function to delete project
    function deleteProject(uint256 _index) public onlyOwner {
        require(_index < _projects.length, "Invalid index");

        // Move the last element to the deleted index
        uint256 lastIndex = _projects.length - 1;
        _projects[_index] = _projects[lastIndex];

        // Clear the last element, making the array compact
        delete _projects[lastIndex];

        // Reduce the array length by one
        _projects.pop();
    }

    // Write function to get all projects
    function getAllProjects() public view returns (Project[] memory) {
        return _projects;
    }
}