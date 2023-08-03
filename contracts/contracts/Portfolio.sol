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

}
