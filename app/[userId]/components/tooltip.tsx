"use client";
import React from "react";
import styles from "./tooltip.module.css";
import clsx from "clsx";

const Tooltip = () => {
    return (
        <div className={clsx("absolute top-0 left-0", styles.tooltipContainer, 'disableHighlight')}>
            <div
                className={
                    "h-[90px] w-[200px] bg-[#f1e6d7] relative right-[-120px] flex justify-center items-center text-xs border-[1px] border-black"
                }
            >
                You've got Mail!
            </div>
            <div className={styles.triangle} />
        </div>
    );
};

export default Tooltip;
