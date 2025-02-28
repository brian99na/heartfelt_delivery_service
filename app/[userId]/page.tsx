import React from "react";
import styles from "./main.module.css";
import Navbar from "./components/navbar";
import clsx from "clsx";
import Desktop from "./components/desktop";

interface PageProps {
    params: {
        userId: string;
    };
}

const Page: React.FC<PageProps> = async ({ params }) => {
    const {userId} = await params
    return (
        <div
            className={clsx(styles.mainContainer, "font-PixelArial", "text-xs")}
        >
            <Navbar />
            <Desktop userId={userId} />
        </div>
    );
};

export default Page;
