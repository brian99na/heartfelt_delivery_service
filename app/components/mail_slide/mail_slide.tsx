import { BuildStatus, MailTypes } from "@/app/utils/types";
import React from "react";
import { iconMapping } from "@/app/utils/constants";
import Image from "next/image";
import PreviewInbox from "./preview_inbox";
import { BuilderContext } from "../builder_context/BuilderContext";
import clsx from "clsx";

const MailBuilder = () => {
    const {
        setBuildStatus,
        finalData: {
            mailType,
            inbox: { hint, password },
        },
        setFinalData,
    } = React.useContext(BuilderContext);
    const passwordRef = React.useRef<HTMLInputElement>(null);
    const hintRef = React.useRef<HTMLInputElement>(null);
    const [passwordEnabled, setPasswordEnabled] =
        React.useState<boolean>(false);
    const [passwordVisible, setPasswordVisible] =
        React.useState<boolean>(false);

    const handleMailChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value in MailTypes) {
            const type = MailTypes[e.target.value as keyof typeof MailTypes];
            setFinalData((prev) => {
                return {
                    ...prev,
                    mailType: type,
                };
            });
            evaluateComplete();
        }
    };

    const handlePasswordEnabled = () => {
        setFinalData((prev) => {
            return {
                ...prev,
                inbox: {
                    ...prev.inbox,
                    password: passwordEnabled ? "" : passwordRef.current?.value,
                    hint: passwordEnabled ? "" : hintRef.current?.value,
                },
            };
        });
        setPasswordEnabled((prev) => !prev);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFinalData((prev) => {
            return {
                ...prev,
                inbox: {
                    ...prev.inbox,
                    password: e.target.value,
                },
            };
        });
    };

    const handleHintChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFinalData((prev) => {
            return {
                ...prev,
                inbox: {
                    ...prev.inbox,
                    hint: e.target.value,
                },
            };
        });
    };

    const evaluateComplete = () => {
        if (passwordEnabled) {
            if (!password || !hint) {
                setBuildStatus((prev) => {
                    return {
                        ...prev,
                        mail: BuildStatus.INCOMPLETE,
                    };
                });
                return;
            }
        }
        setBuildStatus((prev) => {
            return {
                ...prev,
                mail: BuildStatus.COMPLETE,
            };
        });
    };

    React.useEffect(() => {
        evaluateComplete();
    }, [password, hint, passwordEnabled]);

    const { src, alt } = iconMapping[mailType];

    return (
        <div className="flex justify-start flex-col gap-4 items-start h-[466px] p-8">
            <h1 className="text-center font-Silkscreen text-2xl">
                Mail Settings
            </h1>
            <p className="text-center">What's the occasion?</p>
            <div className="flex justify-center items-center w-full gap-2">
                <div className="bg-white p-2 rounded-lg border-[1px] border-gray-200">
                    <Image src={src} alt={alt} width={30} height={30} />
                </div>
                <select
                    onChange={handleMailChange}
                    className="w-full p-3 rounded-lg border-[1px] border-gray-200 focus:outline-none cursor-pointer"
                >
                    {Object.keys(MailTypes).map((type) => {
                        const mailType = type as keyof typeof MailTypes;
                        return (
                            <option key={mailType} value={mailType}>
                                {MailTypes[mailType]}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className="flex justify-start items-center w-full gap-2">
                <input onChange={handlePasswordEnabled} type="checkbox" />
                <p className="text-center">Use a password?</p>
            </div>
            <div className="flex justify-center items-center w-full gap-2 relative">
                <input
                    ref={passwordRef}
                    onChange={handlePasswordChange}
                    type="text"
                    maxLength={20}
                    disabled={!passwordEnabled}
                    placeholder="Enter password"
                    className="w-full p-3 rounded-lg border-[1px] border-gray-200 focus:outline-none"
                />
                <input
                    ref={hintRef}
                    onChange={handleHintChange}
                    maxLength={30}
                    minLength={4}
                    type="text"
                    disabled={!passwordEnabled}
                    placeholder="Give a hint"
                    className="w-full p-3 rounded-lg border-[1px] border-gray-200 focus:outline-none"
                />
            </div>
            <div className="flex justify-start items-start flex-col w-full gap-2">
                <p className="text-center">Preview</p>
                <PreviewInbox
                    passwordEnabled={passwordEnabled}
                    hint={hint}
                    mailType={mailType}
                    password={password}
                />
            </div>
        </div>
    );
};

export default MailBuilder;
