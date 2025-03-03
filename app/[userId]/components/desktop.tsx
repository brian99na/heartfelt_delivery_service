"use client";
import React from "react";
import DesktopIcon from "./desktop_icon";
import { Apps, User } from "../../utils/types";
import Tooltip from "./tooltip";
import Window from "./window";
import { formatDataToUser, getWindow } from "../../utils/utils";
import clsx from "clsx";
import { WindowContext } from "./windowContext/WindowContext";
import { defaultUser } from "@/app/utils/constants";
import { fetchUserData } from "@/lib/api/actions";
import styles from "./desktop.module.css";
import Image from "next/image";

const Desktop = ({ userId }: { userId: string }) => {
    const [selectedApp, setSelectedApp] = React.useState<Apps | null>(null);
    const [windowsOpen, setWindowsOpen] = React.useState<Apps[]>([]);
    const [allowAudio, setAllowAudio] = React.useState<boolean>(false);
    const [user, setUser] = React.useState<User>(defaultUser);

    const getUserData = async () => {
        const userData = await fetchUserData(userId);
        const formattedData = formatDataToUser(userData);
        setUser(formattedData);
    };

    const handleEmptyClick = () => {
        if (selectedApp) {
            setSelectedApp(null);
        }
    };

    React.useEffect(() => {
        if (allowAudio) {
            if (!windowsOpen.includes(Apps.MUSIC)) {
                setWindowsOpen([...windowsOpen, Apps.MUSIC]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allowAudio]);

    React.useEffect(() => {
        getUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className={clsx(
                "h-full flex flex-col justify-start items-start relative"
            )}
        >
            <DesktopIcon
                iconName={Apps.MAIL}
                setSelectedApp={setSelectedApp}
                selectedApp={selectedApp}
                windowsOpen={windowsOpen}
                setWindowsOpen={setWindowsOpen}
            >
                <Tooltip />
            </DesktopIcon>
            <DesktopIcon
                iconName={Apps.MUSIC}
                setSelectedApp={setSelectedApp}
                selectedApp={selectedApp}
                windowsOpen={windowsOpen}
                setWindowsOpen={setWindowsOpen}
            />
            <DesktopIcon
                iconName={Apps.TRASH}
                setSelectedApp={setSelectedApp}
                selectedApp={selectedApp}
                windowsOpen={windowsOpen}
                setWindowsOpen={setWindowsOpen}
            />
            <WindowContext.Provider value={{ user, allowAudio, setAllowAudio }}>
                {windowsOpen.map((app: Apps, idx) => (
                    <Window
                        key={"window" + idx}
                        setWindowsOpen={setWindowsOpen}
                        app={app}
                        zIndex={idx + 1}
                    >
                        {getWindow(app)}
                    </Window>
                ))}
            </WindowContext.Provider>
            <div
                onClick={handleEmptyClick}
                className={clsx("h-full w-full absolute z-0", styles.desktopBg)}
            />
            <Image
                src={"/icons/shoes.gif"}
                alt="delivery shoes ascii icon"
                width={750}
                height={750}
                className="disableHighlight absolute bottom-0 right-0 pointer-events-none"
            />
        </div>
    );
};

export default Desktop;
