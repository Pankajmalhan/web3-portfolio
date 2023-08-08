import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { CHAIN } from "const/chains";
import { portfolio } from "const/contracts";


class PortfolioService {
  sdk: ThirdwebSDK;
  constructor() {
    this.sdk = new ThirdwebSDK(CHAIN,{
        clientId: process.env.THIRDWEB_CLIENT_ID,
        secretKey: process.env.THIRDWEB_SECRET_KEY,
      });
  }

  async getOwner() {
    const contract = await this.sdk.getContract(portfolio);
    return await contract.call("owner");
  }

  async getName() {
    const contract = await this.sdk.getContract(portfolio);
    return await contract.call("getName");
  }

  async getDescription() {
    const contract = await this.sdk.getContract(portfolio);
    return await contract.call("getDescription");
  }

  async getImage() {
    const contract = await this.sdk.getContract(portfolio);
    return await contract.call("getImage");
  }

  async getResume() {
    const contract = await this.sdk.getContract(portfolio);
    return await contract.call("getResume");
  }

  async getEmail() {
    const contract = await this.sdk.getContract(portfolio);
    return await contract.call("getEmail");
  }

  async getPhone() {
    const contract = await this.sdk.getContract(portfolio);
    return await contract.call("getPhone");
  }

  async getTagline() {
    const contract = await this.sdk.getContract(portfolio);
    return await contract.call("getTagline");
  }

  async getGithub() {
    const contract = await this.sdk.getContract(portfolio);
    return await contract.call("getGithub");
  }

  async getLinkedin() {
    const contract = await this.sdk.getContract(portfolio);
    return await contract.call("getLinkedin");
  }

  async getAll() {
    const contract = await this.sdk.getContract(portfolio);
    return await contract.call("getAll");
  }
}

const portfolioService = new PortfolioService();
export default portfolioService