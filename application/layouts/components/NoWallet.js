import { markdownify } from "@lib/utils/textConverter";
import { ConnectWallet } from "@thirdweb-dev/react";
import { CHAIN } from "const/chains";

const NoWallet = ({ isMismatched }) => {
    const text = isMismatched ? `Please connect to the correct network, ${CHAIN.name}` : "Please connect your wallet to access this page";
    const header = isMismatched ? "Network is wrong" : "No Wallet connect";
    return <section className="section">
        <div className="container">
            <div className="flex h-[40vh] items-center justify-center">
                <div className="text-center">
                    <h1 className="mb-4">{header}</h1>
                    {markdownify(text, "div", "content")}
                    <ConnectWallet
                        theme="light"
                        modalTitle="Login"
                        btnTitle="Connect Wallet" />
                </div>
            </div>
        </div>
    </section>
}

export default NoWallet;