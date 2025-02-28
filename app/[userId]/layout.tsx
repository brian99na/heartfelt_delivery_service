import type { Metadata } from "next";
import "./globals.css";
import { DotGothic16, Silkscreen } from "next/font/google";
import localFont from "next/font/local";

export const PixelArial = localFont({
    src: "../../public/fonts/PixelArial.ttf",
    variable: "--font-PixelArial",
    display: "swap",
});

export const DotGothic = DotGothic16({
    weight: "400",
    variable: "--font-Dotgothic",
    subsets: ["latin"],
    display: "swap",
});
export const SilkscreenFont = Silkscreen({
    weight: "400",
    variable: "--font-Silkscreen",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Heartfelt Delivery Service",
    description: "Your one stop shop for all things heartfelt",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${DotGothic.variable} ${PixelArial.variable} ${SilkscreenFont.variable} antialiased overflow-hidden`}
            >
                {children}
            </body>
        </html>
    );
}
