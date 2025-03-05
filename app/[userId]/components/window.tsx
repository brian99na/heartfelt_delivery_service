"use client";
import React from "react";
import clsx from "clsx";
import { Apps } from "../../utils/types";
import { windowDetailMapping } from "../../utils/constants";
import { useDrag } from "../../hooks/useDrag";
import Background from "@/app/shared/background";

interface WindowProps {
    setWindowsOpen: React.Dispatch<React.SetStateAction<Apps[]>>;
    zIndexes: number[];
    setZIndexes: React.Dispatch<React.SetStateAction<number[]>>;
    app: Apps;
}

const Window = (props: React.PropsWithChildren<WindowProps>) => {
    const { setWindowsOpen, zIndexes, app, children } = props;
    const draggableRef = React.useRef(null);
    const { position, handleMouseDown } = useDrag({
        ref: draggableRef,
    });

    const handleWindowClose = () => {
        setWindowsOpen((windowsOpen) => {
            return windowsOpen.filter((window) => window !== app);
        });
    };

    // const handleFocusWindow = () => {
    //     setZIndexes((prevzIndexes) => {
    //         const currMax = Math.max(...zIndexes);
    //         prevzIndexes[currentIndex] = currMax + 1
    //         return prevzIndexes
    //     });
    // };

    const currentIndex = app === Apps.MAIL ? 0 : app === Apps.MUSIC ? 1 : 2;
    const zIndex = zIndexes[currentIndex];

    const windowLocationAndSize = windowDetailMapping[app];
    return (
        <div
            className={clsx(
                "absolute bg-window border-[1px] border-black overflow-hidden",
                `z-[${zIndex}]`,
                windowLocationAndSize
            )}
            ref={draggableRef}
            style={{
                top: position.y,
                left: position.x,
                boxShadow: "4px 4px 1px 1px rgba(0, 0, 0, 0.2)",
            }}
        >
            <div
                onMouseDown={handleMouseDown}
                className={clsx(
                    "border-b-[1px] border-black p-1 flex justify-center cursor-move",
                    "disableHighlight"
                )}
            >
                <div
                    onClick={handleWindowClose}
                    className="w-4 h-4 aspect-square border-[1px] border-black flex justify-center items-center absolute top-0 left-0 m-1 cursor-pointer hover:text-white hover:bg-black"
                >
                    <div className="top-[-2px] absolute">✕</div>
                </div>
                <div>{app}</div>
            </div>
            {children}
            <Background />
        </div>
    );
};

export default Window;
