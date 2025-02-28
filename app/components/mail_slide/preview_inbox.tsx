import {
    MAILBOX_ENTER_PASSWORD,
    MAILBOX_INCORRECT_PASSWORD,
    MAILBOX_NEW_MESSAGE,
} from "@/app/strings";
import { iconMapping } from "@/app/utils/constants";
import { MailTypes } from "@/app/utils/types";
import Image from "next/image";
import React from "react";
import { Typewriter } from "react-simple-typewriter";

interface PreviewInboxProps {
    passwordEnabled: boolean;
    mailType: MailTypes;
    password?: string;
    hint?: string;
}

const PreviewInbox = (props: PreviewInboxProps) => {
    const { mailType, passwordEnabled, password, hint } = props;
    const { src, alt } = iconMapping[mailType];
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [passwordValue, setPasswordValue] = React.useState<string>("");
    const [message, setMessage] = React.useState<string>(
        MAILBOX_ENTER_PASSWORD
    );

    const handleClick = () => {
        if (passwordEnabled) {
            setShowPassword(true);
            setMessage(MAILBOX_ENTER_PASSWORD);
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (passwordValue === password) {
            setMessage('Success!')
        } else {
            let errorMessage = MAILBOX_INCORRECT_PASSWORD;
            errorMessage = hint ? errorMessage + hint : errorMessage;
            setMessage(errorMessage);
        }
    };
    return (
        <div
            onClick={handleClick}
            className="flex justify-between items-center w-full border-[1px] border-gray-200 rounded-lg .disableHighlight hover:bg-[#f2f2f2] cursor-pointer py-4 px-8 z-2"
        >
            <Image
                src={src}
                alt={alt}
                width={50}
                height={50}
                className="aspect-square p-2"
            />
            <div className="flex flex-col gap-1 w-[200px]">
                {!showPassword && (
                    <Typewriter words={[MAILBOX_NEW_MESSAGE(1)]} />
                )}
                <p className="overflow-hidden text-ellipsis">
                    {showPassword && message}
                </p>
                {showPassword && (
                    <form onSubmit={handleSubmit}>
                        <input
                            className="border-b-[1px] border-r-0 focus:outline-slate-400 focus:caret-transparent p-1"
                            onChange={handlePasswordChange}
                            value={passwordValue}
                        />
                    </form>
                )}
            </div>
            {passwordEnabled ? "ꗃ" : "o"}
        </div>
    );
};

export default PreviewInbox;
