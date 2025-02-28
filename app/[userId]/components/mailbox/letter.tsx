import React from "react";
import styles from "./mail_window.module.css";
import clsx from "clsx";
import { Typewriter } from "react-simple-typewriter";
import { WindowContext } from "../windowContext/WindowContext";

interface LetterProps {
    showLetter: boolean;
}

const Letter = ({ showLetter }: LetterProps) => {
    const { user: {letter: {header, paragraph, footer}} } = React.useContext(WindowContext);
    return (
        <div
            className={clsx(
                "opacity-0 pointer-events-none p-10 overflow-scroll",
                {
                    [styles.fadeIn]: showLetter,
                }
            )}
        >
            <h1 className="font-Silkscreen text-3xl pb-2">
                <span>
                    <Typewriter words={[header]} />
                </span>
            </h1>
            <p>
                {paragraph}
            </p>
            <h1 className="font-Silkscreen text-xl pt-2">{footer}</h1>
        </div>
    );
};

export default Letter;
