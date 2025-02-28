import React from "react";
import styles from "./main.module.css";
import Navbar from "./components/navbar";
import clsx from "clsx";
import Desktop from "./components/desktop";

export default async function Page({
    params,
}: {
    params: Promise<{ userId: string }>;
}) {
    const { userId } = await params;
    return (
        <div
            className={clsx(styles.mainContainer, "font-PixelArial", "text-xs")}
        >
            <Navbar />
            <Desktop userId={userId} />
        </div>
    );
}
