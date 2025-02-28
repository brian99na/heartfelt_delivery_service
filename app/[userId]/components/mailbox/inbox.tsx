import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { iconMapping } from "../../../utils/constants";
import { MailTypes } from "../../../utils/types";
import styles from "./mail_window.module.css";
import {
    MAILBOX_ENTER_PASSWORD,
    MAILBOX_INCORRECT_PASSWORD,
    MAILBOX_NEW_MESSAGE,
} from "@/app/strings";
import { Typewriter } from "react-simple-typewriter";
import { WindowContext } from "../windowContext/WindowContext";

interface InboxProps {
    handleMailClick: () => void;
    mailClicked: boolean;
}

const Inbox = ({ handleMailClick, mailClicked }: InboxProps) => {
    const {
        setAllowAudio,
        user: {
            mailType,
            inbox: { password, hint },
        },
    } = React.useContext(WindowContext);
    const { src, alt } = iconMapping[mailType ?? MailTypes.HEART];
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [passwordValue, setPasswordValue] = React.useState<string>("");
    const [message, setMessage] = React.useState<string>(
        MAILBOX_ENTER_PASSWORD
    );

    const handleClick = () => {
        if (password) {
            setShowPassword(true);
            setMessage(MAILBOX_ENTER_PASSWORD);
        } else {
            handleMailClick();
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (passwordValue === password) {
            handleMailClick();
            setAllowAudio(true);
        } else {
            let errorMessage = MAILBOX_INCORRECT_PASSWORD;
            errorMessage = hint ? errorMessage + " - " + hint : errorMessage;
            setMessage(errorMessage);
        }
    };

    return (
        <div
            onClick={handleClick}
            className={clsx(
                "flex justify-between items-center w-full border-b-[1px] border-black .disableHighlight hover:bg-[#f1e6d7] cursor-pointer py-4 px-8 z-2",
                {
                    [styles.fadeOut]: mailClicked,
                }
            )}
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
            {password ? "ꗃ" : "o"}
        </div>
    );
};

export default Inbox;
