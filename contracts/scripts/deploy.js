const { ethers, upgrades } = require("hardhat");

async function main() {
    const Portfolio = await ethers.getContractFactory("Portfolio");
    const portfolio = await upgrades.deployProxy(Portfolio);
    console.log("portfolio deployed to:", portfolio);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
