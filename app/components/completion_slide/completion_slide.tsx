"use client"
import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { BuilderContext } from "../builder_context/BuilderContext";
import { BuildStatus } from "@/app/utils/types";
import { COMPLETION_SLIDE_STATUSES } from "@/app/strings";

const CompletionSlide = () => {
    const { buildStatus, currentSlide, setCurrentSlide } = React.useContext(BuilderContext);
    const iconAndStatus = React.useMemo(() => {
        return Object.values(buildStatus).map((status, idx) => {
            const icon =
                status === BuildStatus.COMPLETE
                    ? "🟢"
                    : status === BuildStatus.INCOMPLETE
                    ? "🔴"
                    : "🟡";
            switch (idx) {
                case 0:
                    return `${icon} ${status} `;
                case 1:
                    return `${icon} ${status} `;
                case 2:
                    return `${icon} ${status} `;
                case 3:
                    return `${icon} ${status} `;
                default:
                    return "";
            }
        });
    }, [buildStatus]);

    const handleGoToSlide = (idx: number) => {
        setCurrentSlide(idx);
    };  

    return (
        <div className="flex justify-start flex-col gap-4 items-start h-[466px] p-8">
            <h1 className="text-center font-Silkscreen text-2xl">Summary</h1>
            <p className="text-center">Confirm your message below</p>
            <div className="flex flex-col justify-start items-center w-full gap-1">
                {currentSlide === 5 &&
                    iconAndStatus.map((_, idx) => (
                        <div
                            onClick={() => handleGoToSlide(idx + 1)}
                            key={idx}
                            className="flex justify-between items-center w-full p-4 bg-white rounded-lg border-[1px] border-gray-200 cursor-pointer hover:bg-slate-100"
                        >
                            <Typewriter
                                typeSpeed={40 + idx * 18}
                                key={'type1' + idx}
                                words={[COMPLETION_SLIDE_STATUSES[idx]]}
                            />
                            <Typewriter
                                    typeSpeed={80 + idx * 18}
                                    key={'type2' + idx}
                                    words={[iconAndStatus[idx]]}
                                />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default CompletionSlide;
