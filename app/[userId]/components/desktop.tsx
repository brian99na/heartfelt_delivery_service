"use client";
import React from "react";
import DesktopIcon from "./desktop_icon";
import { Apps, FlapLocations, User } from "../../utils/types";
import Tooltip from "./tooltip";
import Window from "./window";
import { formatDataToUser, getWindow } from "../../utils/utils";
import clsx from "clsx";
import { WindowContext } from "./windowContext/WindowContext";
import { defaultUser, flapGifPlacementMapping } from "@/app/utils/constants";
import { fetchUserData } from "@/lib/api/actions";
import styles from "./desktop.module.css";
import Image from "next/image";

const Desktop = ({ userId }: { userId: string }) => {
    const [selectedApp, setSelectedApp] = React.useState<Apps | null>(null);
    const [windowsOpen, setWindowsOpen] = React.useState<Apps[]>([]);
    const [allowAudio, setAllowAudio] = React.useState<boolean>(false);
    const [user, setUser] = React.useState<User>(defaultUser);
    const [zIndexes, setZIndexes] = React.useState<number[]>([1, 2, 3]);
    const [flapGifPlacement, setFlapGifPlacement] = React.useState<FlapLocations>(FlapLocations.BOTTOMRIGHT);

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

    const resetStates = () => {
        setAllowAudio(false);
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

        const interval = setInterval(() => {
            setFlapGifPlacement((prevFlapGifPlacement: FlapLocations) => {
                if (prevFlapGifPlacement === FlapLocations.BOTTOMRIGHT) {
                    return FlapLocations.BOTTOMLEFT;
                } else if (prevFlapGifPlacement === FlapLocations.BOTTOMLEFT) {
                    return FlapLocations.TOPRIGHT;
                } else if (prevFlapGifPlacement === FlapLocations.TOPLEFT) {
                    return FlapLocations.TOPRIGHT;
                } else {
                    return FlapLocations.BOTTOMRIGHT;
                }
            })
        }, 2000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if (windowsOpen.length === 0) {
            resetStates();
        }
    }, [windowsOpen]);

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
                {windowsOpen.includes(Apps.MAIL) && (
                    <Window
                        setWindowsOpen={setWindowsOpen}
                        app={Apps.MAIL}
                        zIndexes={zIndexes}
                        setZIndexes={setZIndexes}
                    >
                        {getWindow(Apps.MAIL)}
                    </Window>
                )}
                {windowsOpen.includes(Apps.MUSIC) && (
                    <Window
                        setWindowsOpen={setWindowsOpen}
                        app={Apps.MUSIC}
                        zIndexes={zIndexes}
                        setZIndexes={setZIndexes}
                    >
                        {getWindow(Apps.MUSIC)}
                    </Window>
                )}
                {windowsOpen.includes(Apps.TRASH) && (
                    <Window
                        setWindowsOpen={setWindowsOpen}
                        app={Apps.TRASH}
                        zIndexes={zIndexes}
                        setZIndexes={setZIndexes}
                    >
                        {getWindow(Apps.TRASH)}
                    </Window>
                )}
            </WindowContext.Provider>
            <div
                onClick={handleEmptyClick}
                className={clsx("h-full w-full absolute z-0", styles.desktopBg)}
            />
            <Image
                src={"/assets/envelope.gif"}
                alt="delivery shoes ascii icon"
                width={500}
                height={500}
                className={clsx("disableHighlight absolute bottom-0 right-0 pointer-events-none", flapGifPlacementMapping[flapGifPlacement])}
            />
        </div>
    );
};

export default Desktop;
