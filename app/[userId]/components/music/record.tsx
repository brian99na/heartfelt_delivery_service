import clsx from "clsx";
import React from "react";
import styles from "./music_window.module.css";
import { PlayPause } from "@/app/utils/types";

interface RecordProps {
    playPause: PlayPause;
}

const Record = ({ playPause }: RecordProps) => {
    const [initialPause, setInitialPause] = React.useState<boolean>(false)

    React.useEffect(() => {
      setTimeout(() => {
        setInitialPause(true)
      }, 1000)
    }, [])

    return (
        <div className="w-[80%] aspect-square border-[1px] border-black rounded-3xl flex justify-center items-center relative bg-btnBackground">
            <div
                style={{animationPlayState: initialPause && playPause === PlayPause.PLAY ? "running" : "paused" }}
                className={clsx(
                    "w-[80%] aspect-square bg-black rounded-full flex justify-center items-center relative",
                    styles.animateRecord
                )}
            >
                <div className="w-[40%] aspect-square bg-black rounded-full flex justify-center items-center z-[2] p-2">
                    <div className="w-[99%] aspect-square bg-black border-[2px] border-window rounded-full flex justify-center items-center z-[3] p-2">
                        <div className="w-[6%] aspect-square bg-window rounded-full"></div>
                    </div>
                </div>
                <div
                    className={clsx(
                        "w-[90%] aspect-square bg-black rounded-full flex justify-center items-center absolute",
                        styles.recordAccents
                    )}
                />
            </div>
            <div
                className={clsx(
                    "w-[20px] aspect-square rounded-full flex justify-center items-center absolute top-[10%] right-[10%]",
                    styles.animateHand
                )}
            >
                <div className="w-[5px] h-[60px] flex justify-center items-center bg-btnBackground absolute top-[8px] right-[4px] " />
                <div className="w-[5px] h-[65px] flex justify-center items-center bg-btnBackground absolute top-[65px] right-[10.5px] rotate-12" />
                <div className="w-[10px] h-[20px] flex justify-center items-center bg-btnBackground bg-blend-difference absolute top-[110px] right-[13px] rotate-12" />
            </div>
        </div>
    );
};

export default Record;
