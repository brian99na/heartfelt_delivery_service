import clsx from "clsx";
import React from "react";

const StaticWindowNavbar = () => {
    return (
        <div
            className={clsx(
                "border-b-[1px] border-black p-1 flex justify-center",
                "disableHighlight"
            )}
        >
            <div className="w-4 h-4 aspect-square border-[1px] border-black flex justify-center items-center absolute top-1 left-1 m-1 cursor-pointer hover:text-white hover:bg-black">
                <div className="top-[-8.5px] absolute text-lg">✕</div>
            </div>
            <div className="font-Silkscreen text-base flex gap-2">
                Message Builder
            </div>
        </div>
    );
};

export default StaticWindowNavbar;
