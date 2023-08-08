/**
 * Configure your smart contract addresses here.
 * Each smart contract should have two addresses defined:
 *   1. Development address - used for testing purposes
 *   2. Production address - the mainnet smart contract address for when you deploy your application
 */

import { IS_DEV_ENV } from "./chains";

// For example, below, we have a Greeter smart contract that has two addresses defined.
// Then, we use the IS_DEV_ENV variable to determine which address to use in the current environment.
const portfolio_dev = "0x12B34e91D3429AAF7116fE093FD06f8D830448D1";
const portfolio_prod = "";

// Below, we force the typescript type to be of the dev address type.
// This is to ensure thirdweb generate knows what the ABI is when using useContract
// So that we get type-safety when interacting with it's functions.
export const portfolio = IS_DEV_ENV
  ? portfolio_dev
  : (portfolio_prod as typeof portfolio_dev); // Here's the type assertion, since we assume the ABIs are the same in dev and prod.