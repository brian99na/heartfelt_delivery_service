import clsx from "clsx";
import React from "react";
import mainStyles from "../[userId]/main.module.css";

const Background = () => {
    return (
        <div
            className={clsx(
                "absolute w-full h-full top-0 left-0 pointer-events-none rotate(90)",
                mainStyles.windowBg
            )}
        />
    );
};

export default Background;
