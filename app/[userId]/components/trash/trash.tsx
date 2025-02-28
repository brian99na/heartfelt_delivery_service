import { redirectToBuildPage } from "@/lib/api/actions";
import React from "react";

const Trash = () => {
    const handleRedirect = () => {
        redirectToBuildPage()
    };
    return (
        <div className="flex flex-col justify-center items-center w-full h-[173px]">
            <h1 className="text-xl font-Silkscreen p-2">
                Build your own message below
            </h1>
            <h1
                onClick={handleRedirect}
                className="bg-white rounded-lg border-[1px] border-gray-200 text-2xl aspect-square pr-2 pl-2 cursor-pointer hover:bg-slate-100"
            >
                ❐
            </h1>
        </div>
    );
};

export default Trash;
