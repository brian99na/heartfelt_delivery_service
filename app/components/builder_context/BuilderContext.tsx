import { Apps, BuildStatus, MailTypes, User } from "@/app/utils/types";
import React from "react";

interface BuilderContextProps {
    nextButtonDisabled: boolean;
    openWindows: Apps[];
    setOpenWindows: React.Dispatch<React.SetStateAction<Apps[]>>;
    setNextButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
    finalData: User;
    setFinalData: React.Dispatch<React.SetStateAction<User>>;
    buildStatus: {
        mail: BuildStatus;
        video: BuildStatus;
        audio: BuildStatus;
        letter: BuildStatus;
    };
    setBuildStatus: React.Dispatch<
        React.SetStateAction<{
            mail: BuildStatus;
            video: BuildStatus;
            audio: BuildStatus;
            letter: BuildStatus;
        }>
    >;
    currentSlide: number;
    setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
    handleCreateMessage: (finalData: User) => void;
    messageUrl: string | undefined;
    errorMessage: string | undefined;
}

export const defaultBuilderContext: BuilderContextProps = {
    nextButtonDisabled: false,
    openWindows: [],
    setOpenWindows: () => {},
    setNextButtonDisabled: () => {},
    finalData: {
        video: {},
        audio: {},
        inbox: {},
        mailType: MailTypes.HEART,
        letter: {
            header: "",
            paragraph: "",
            footer: "",
        },
    },
    setFinalData: () => {},
    buildStatus: {
        mail: BuildStatus.INCOMPLETE,
        video: BuildStatus.INCOMPLETE,
        audio: BuildStatus.INCOMPLETE,
        letter: BuildStatus.INCOMPLETE,
    },
    setBuildStatus: () => {},
    currentSlide: 0,
    setCurrentSlide: () => {},
    handleCreateMessage: () => {},
    messageUrl: undefined,
    errorMessage: undefined,
};

export const BuilderContext = React.createContext(defaultBuilderContext);
