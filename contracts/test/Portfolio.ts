import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Portfolio", function () {
    // Define a fixture to reuse the same setup in every test
    async function deployFixture() {
        const [owner, otherAccount] = await ethers.getSigners();

        const portfolioFactory = await ethers.getContractFactory("Portfolio");
        const portfolio = await portfolioFactory.deploy();
        portfolio.deployed();
        return { portfolio, owner, otherAccount };
    }

    // An example test suite that uses the fixture's values
    describe("Test owner", function () {
        it("Should deploy with a right owner", async function () {
            const { portfolio, owner, otherAccount } = await loadFixture(deployFixture);
            const contractOwner = await portfolio.owner();
            const ownerAddressShouldBe = await owner.getAddress();
            expect(contractOwner).to.equal(ownerAddressShouldBe);
        });
    });

    describe("Test setName", function () {

        const newName = "Pankaj's Portfolio";
        let portfolio_: any, owner_: any, otherAccount_: any;
        this.beforeAll(async function () {
            const { portfolio, owner, otherAccount } = await loadFixture(deployFixture);
            portfolio_ = portfolio;
            owner_ = owner;
            otherAccount_ = otherAccount;
            // Call setName function by the owner
            await portfolio.connect(owner).setName(newName);
        });

        it("should set the name correctly by the contract owner", async function () {
            // Check if the name is updated correctly
            const updatedName = await portfolio_.getName();
            expect(updatedName).to.equal(newName);
        });

        it("should not set the name if called by a non-owner account", async function () {
            // Try to call setName function by a non-owner account
            await expect(portfolio_.connect(otherAccount_).setName(newName)).to.be.revertedWith(
                "Ownable: caller is not the owner"
            );
            // Check if the name remains unchanged
            const currentName = await portfolio_.getName();
            expect(currentName).to.be.equal(newName);
        });

        it("should not set an empty name", async function () {

            const emptyName = "";
            // Try to call setName function with an empty name by the contract owner
            await expect(portfolio_.connect(owner_).setName(emptyName)).to.be.revertedWith(
                "Name cannot be empty"
            );
            // Check if the name remains unchanged
            const currentName = await portfolio_.getName();
            expect(currentName).to.not.equal(emptyName);
            expect(currentName).to.be.equal(newName);
        });

        it("should not set the same name as the current name", async function () {
            // Try to call setName function with the same name as the current name by the contract owner
            await expect(portfolio_.connect(owner_).setName(newName)).to.be.revertedWith(
                "New name is the same as the current name"
            );

            // Check if the name remains unchanged
            const updatedName = await portfolio_.getName();
            expect(updatedName).to.equal(newName);
        });
    });

    describe("Test getName", function () {

        const newName = "Pankaj's Portfolio";
        it("initial name should be empty", async function () {
            const { portfolio, owner, otherAccount } = await loadFixture(deployFixture);
            // Check if the name is updated correctly
            const currentName = await portfolio.getName();
            expect(currentName).to.equal("");
        });

        it("should return the updated name after calling setName", async function () {
            const updatedName = "new name";
            const { portfolio, owner, otherAccount } = await loadFixture(deployFixture);
            await portfolio.connect(owner).setName(updatedName);

            // Call getName function and check if it returns the updated name
            const name = await portfolio.getName();
            expect(name).to.equal(updatedName);
        });

        it("should not modify the name when calling getName", async function () {
            const newName = "New Contract Name";
            const { portfolio, owner, otherAccount } = await loadFixture(deployFixture);
            // Call getName function before calling setName
            await portfolio.connect(owner).setName(newName);

            const name = await portfolio.getName();
            expect(name).to.equal(newName);
        });
    });

    describe("Test setDescription", function () {

        let portfolio:any;
        let owner:any;
        let otherAccount:any;

        // Use deployFixture to set up the contract deployment and get signers before each test
        this.beforeAll(async function () {
            // Deploy the contract and get signers using the deployFixture function
            ({ portfolio, owner, otherAccount } = await loadFixture(deployFixture));
        });

        it("should set the description correctly by the contract owner", async function () {
            const newDescription = "New Contract Description";

            // Call setDescription function by the owner
            await portfolio.connect(owner).setDescription(newDescription);

            // Check if the description is updated correctly
            const updatedDescription = await portfolio.getDescription();
            expect(updatedDescription).to.equal(newDescription);
        });

        it("should not set the description if called by a non-owner account", async function () {
            const newDescription = "New Contract Description2";

            // Try to call setDescription function by a non-owner account
            await expect(portfolio.connect(otherAccount).setDescription(newDescription)).to.be.revertedWith(
                "Ownable: caller is not the owner"
            );

            // Check if the description remains unchanged
            const currentDescription = await portfolio.getDescription();
            expect(currentDescription).to.not.equal(newDescription);
        });

        it("should not set an empty description", async function () {
            const emptyDescription = "";

            // Try to call setDescription function with an empty description by the contract owner
            await expect(portfolio.connect(owner).setDescription(emptyDescription)).to.be.revertedWith(
                "Description cannot be empty"
            );

            // Check if the description remains unchanged
            const currentDescription = await portfolio.getDescription();
            expect(currentDescription).to.not.equal(emptyDescription);
        });

        it("should not set the same description as the current description", async function () {
            const currentDescription = await portfolio.getDescription();

            // Try to call setDescription function with the same description as the current description by the contract owner
            await expect(portfolio.connect(owner).setDescription(currentDescription)).to.be.revertedWith(
                "New description is the same as the current description"
            );

            // Check if the description remains unchanged
            const updatedDescription = await portfolio.getDescription();
            expect(updatedDescription).to.equal(currentDescription);
        });

    });
});
