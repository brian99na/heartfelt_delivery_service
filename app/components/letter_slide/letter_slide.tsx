import React from "react";
import { BuilderContext } from "../builder_context/BuilderContext";
import { BuildStatus } from "@/app/utils/types";

const LetterBuilder = () => {
    const {
        setBuildStatus,
        finalData: {
            letter: { header, paragraph, footer },
        },
        setFinalData,
    } = React.useContext(BuilderContext);

    const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFinalData((prev) => {
            return {
                ...prev,
                letter: {
                    ...prev.letter,
                    header: e.target.value,
                },
            };
        });
    };

    const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFinalData((prev) => {
            return {
                ...prev,
                letter: {
                    ...prev.letter,
                    paragraph: e.target.value,
                },
            };
        });
    };

    const handleFooterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFinalData((prev) => {
            return {
                ...prev,
                letter: {
                    ...prev.letter,
                    footer: e.target.value,
                },
            };
        });
    };

    const evaluateComplete = () => {
        if (header && paragraph && footer) {
            setBuildStatus((prev) => {
                return {
                    ...prev,
                    letter: BuildStatus.COMPLETE,
                };
            });
        } else {
            setBuildStatus((prev) => {
                return {
                    ...prev,
                    letter: BuildStatus.INCOMPLETE,
                };
            });
        }
    };

    React.useEffect(() => {
        evaluateComplete();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [header, paragraph, footer]);

    return (
        <div className="flex justify-start flex-col gap-2 items-start h-[466px] p-8">
            <h1 className="text-center font-Silkscreen text-2xl">
                Letter Settings
            </h1>
            <p className="text-center">Title</p>
            <input
                onChange={handleHeaderChange}
                type="text"
                maxLength={20}
                placeholder="~ Send a greeting ~"
                className="w-full p-3 rounded-lg border-[1px] border-gray-200 focus:outline-none"
            />
            <p className="text-center">Body</p>
            <textarea
                onChange={handleBodyChange}
                placeholder="~ Write your letter ~"
                className="h-[140px] w-full p-3 rounded-lg border-[1px] border-gray-200 focus:outline-none resize-none"
            />
            <p className="text-center">Footer</p>
            <input
                onChange={handleFooterChange}
                type="text"
                placeholder="~ Sign off here ~"
                className="w-full p-3 rounded-lg border-[1px] border-gray-200 focus:outline-none"
            />
        </div>
    );
};

export default LetterBuilder;
