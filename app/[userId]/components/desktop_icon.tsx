import Image from "next/image";
import React from "react";
import { Apps } from "../../utils/types";
import { iconMapping } from "../../utils/constants";
import clsx from "clsx";

interface DesktopIconProps {
    iconName: Apps;
    selectedApp: Apps | null;
    setSelectedApp: (selectedApp: Apps | null) => void;
    windowsOpen: Apps[];
    setWindowsOpen: (openApps: Apps[]) => void;
}

const DesktopIcon = (props: React.PropsWithChildren<DesktopIconProps>) => {
    const {
        iconName,
        selectedApp,
        setSelectedApp,
        windowsOpen,
        setWindowsOpen,
        children,
    } = props;
    const { src, alt, text } = iconMapping[iconName];
    const [showTooltip, setShowTooltip] = React.useState<boolean>(true);

    const handleClick = (e: React.MouseEvent) => {
        switch (e.detail) {
            case 1:
                setSelectedApp(selectedApp === iconName ? null : iconName);
                break;
            case 2:
                if (!windowsOpen.includes(iconName)) {
                    setWindowsOpen([...windowsOpen, iconName]);
                    if (iconName === Apps.MAIL) {
                        setShowTooltip(false)
                    }
                }
                setSelectedApp(null);
                break;
        }
    };

    return (
        <div
            onClick={handleClick}
            className="flex flex-col justify-center items-center cursor-pointer aspect-square m-2 z-[1] relative"
        >
            <Image
                src={src}
                alt={alt}
                width={70}
                height={70}
                className="aspect-square p-2"
            />
            <div
                className={clsx("pt-0 pb-0 pl-1 pr-1", {
                    "bg-black text-white border-box": selectedApp === iconName,
                })}
            >
                {text}
            </div>
            {showTooltip && children}
        </div>
    );
};

export default DesktopIcon;
