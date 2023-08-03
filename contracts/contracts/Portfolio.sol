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
        string percentage;
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
        string rating;
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

    // Constructor - run when contract is deployed
    constructor() {
        _owner = msg.sender;
    }

    // Read function (can be called without a transaction)
    function getOwner() public view returns (address) {
        return _owner;
    }

    // Write function to update name
    function setName(string memory _newName) public onlyOwner {
        _name = _newName;
    }

    // Read function to get name
    function getName() public view returns (string memory) {
        return _name;
    }

    // Write function to update description
    function setDescription(string memory _newDescription) public onlyOwner {
        _description = _newDescription;
    }

    // Read function to get description
    function getDescription() public view returns (string memory) {
        return _description;
    }

    // Write function to update image
    function setImage(string memory _newImage) public onlyOwner {
        _image = _newImage;
    }

    // Read function to get image
    function getImage() public view returns (string memory) {
        return _image;
    }

    // Write function to update resume
    function setResume(string memory _newResume) public onlyOwner {
        _resume = _newResume;
    }

    // Read function to get resume
    function getResume() public view returns (string memory) {
        return _resume;
    }

    // Write function to update email
    function setEmail(string memory _newEmail) public onlyOwner {
        _email = _newEmail;
    }

    // Read function to get email
    function getEmail() public view returns (string memory) {
        return _email;
    }

    // Write function to update phone
    function setPhone(string memory _newPhone) public onlyOwner {
        _phone = _newPhone;
    }

    // Read function to get phone
    function getPhone() public view returns (string memory) {
        return _phone;
    }

    // Write function to update tagline
    function setTagline(string memory _newTagline) public onlyOwner {
        _tagline = _newTagline;
    }

    // Read function to get tagline
    function getTagline() public view returns (string memory) {
        return _tagline;
    }

    // Write function to update github
    function setGithub(string memory _newGithub) public onlyOwner {
        _github = _newGithub;
    }

    // Read function to get github
    function getGithub() public view returns (string memory) {
        return _github;
    }

    // Write function to update linkedin
    function setLinkedin(string memory _newLinkedin) public onlyOwner {
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
        _name = _newName;
        _description = _newDescription;
        _image = _newImage;
        _resume = _newResume;
        _email = _newEmail;
        _phone = _newPhone;
        _tagline = _newTagline;
        _github = _newGithub;
        _linkedin = _newLinkedin;
    }

    // Write function to get all data
    function getAll() public view returns (
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        string memory
    ) {
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
        string memory _percentage
    ) public onlyOwner {
        _education.push(Education(_name, _degree, _year, _percentage));
    }


    // Write function to get education
    function getEducation(uint256 _index) public view returns (
        string memory,
        string memory,
        string memory,
        string memory
    ) {
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
        string memory _percentage
    ) public onlyOwner {
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
        _experience.push(Experience(_name, _role, _url, _year));
    }

    // Write function to get experience
    function getExperience(uint256 _index) public view returns (
        string memory,
        string memory,
        string memory,
        string memory
    ) {
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
        _experience[_index].name = _name;
        _experience[_index].role = _role;
        _experience[_index].url = _url;
        _experience[_index].year = _year;
    }

    // Write function to delete experience
    function deleteExperience(uint256 _index) public onlyOwner {
        delete _experience[_index];
    }

    // Write function to get all experience
    function getAllExperience() public view returns (Experience[] memory) {
        return _experience;
    }

    // Write function to add skill
    function addSkill(string memory _name, string memory _rating) public onlyOwner {
        _skills.push(Skill(_name, _rating));
    }

    // Write function to get skill
    function getSkill(uint256 _index) public view returns (
        string memory,
        string memory
    ) {
        return (
            _skills[_index].name,
            _skills[_index].rating
        );
    }

    // Write function to get skill length
    function getSkillLength() public view returns (uint256) {
        return _skills.length;
    }

    // Write function to update skill
    function updateSkill(
        uint256 _index,
        string memory _name,
        string memory _rating
    ) public onlyOwner {
        _skills[_index].name = _name;
        _skills[_index].rating = _rating;
    }

    // Write function to delete skill
    function deleteSkill(uint256 _index) public onlyOwner {
        delete _skills[_index];
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
        _projects.push(Project(_name, _description, _url, _github, _year, _image));
    }

    // Write function to get project
    function getProject(uint256 _index) public view returns (
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        string memory
    ) {
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
        _projects[_index].name = _name;
        _projects[_index].description = _description;
        _projects[_index].url = _url;
        _projects[_index].github = _github;
        _projects[_index].year = _year;
        _projects[_index].image = _image;
    }

    // Write function to delete project
    function deleteProject(uint256 _index) public onlyOwner {
        delete _projects[_index];
    }

    // Write function to get all projects
    function getAllProjects() public view returns (Project[] memory) {
        return _projects;
    }
    

}
