/**
 * Configure your smart contract addresses here.
 * Each smart contract should have two addresses defined:
 *   1. Development address - used for testing purposes
 *   2. Production address - the mainnet smart contract address for when you deploy your application
 */

import { IS_DEV_ENV } from "./chains";

// For example, below, we have a Greeter smart contract that has two addresses defined.
// Then, we use the IS_DEV_ENV variable to determine which address to use in the current environment.
const portfolio_dev = "0x8433995539D552594526721eF892a52b826afdb5";
const portfolio_prod = "0xaBC8BE4402367d9B00C308826274196a18AB2940";

const projects_dev = "0x09E38B218b3C2e8F4AAB7c9e9a610BC6972f630D"
const projects_prod = "0x6DBc5f36B2B0c4Bce8e9635f53CF3cbbefA987E0"
// Below, we force the typescript type to be of the dev address type.
// This is to ensure thirdweb generate knows what the ABI is when using useContract
// So that we get type-safety when interacting with it's functions.
export const portfolio = IS_DEV_ENV
  ? portfolio_dev
  : (portfolio_prod as typeof portfolio_dev); // Here's the type assertion, since we assume the ABIs are the same in dev and prod.

export const projects = IS_DEV_ENV
  ? projects_dev
  : (projects_prod as typeof projects_dev);
