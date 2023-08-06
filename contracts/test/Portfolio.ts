import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Portfolio", function () {
    // Define a fixture to reuse the same setup in every test
    async function deployFixture() {
        const [owner, otherAccount] = await ethers.getSigners();

        const portfolioFactory = await ethers.getContractFactory("Portfolio");
        const portfolio = await portfolioFactory.deploy();
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
});
