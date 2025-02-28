import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { BuilderContext } from "../builder_context/BuilderContext";

const SubmittedSlide = () => {
    const { messageUrl } = React.useContext(BuilderContext);
    const [isCopied, setIsCopied] = React.useState(false);

    const handleLinkClick = () => {
        if (messageUrl) {
            navigator.clipboard.writeText(messageUrl);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 3500);
        }
    };

    return (
        <div className="flex justify-center items-center flex-col gap-4 h-[466px] p-8 ">
            {!messageUrl && (
                <span className="text-2xl font-Silkscreen animate-pulse ">
                    Submitting
                    <Typewriter words={["..."]} typeSpeed={10} loop={0} />
                </span>
            )}
            {messageUrl && (
                <>
                    <h1 className="text-2xl font-Silkscreen ">Success!</h1>
                    <p>
                        Your message has been delivered to the following address
                    </p>
                    <div
                        onClick={handleLinkClick}
                        className="flex justify-center items-center bg-white rounded-lg border-[1px] border-gray-200 cursor-pointer hover:bg-slate-50"
                    >
                        <h1 className="p-4 ">{messageUrl}</h1>
                        <div className="p-4 text-xl font-Silkscreen border-l-[1px] border-gray-200 ">
                            ✉️
                        </div>
                    </div>
                    <p>Copy and send your link the the recipient!</p>
                </>
            )}
            {isCopied && (
                <p className="w-full text-center text-2xl font-Silkscreen animate-pulse absolute bottom-0 p-2 bg-black text-white">
                    Copied!
                </p>
            )}
        </div>
    );
};

export default SubmittedSlide;
