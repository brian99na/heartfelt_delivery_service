"use client";
import React from "react";
import clsx from "clsx";
import LandingSlide from "./landing_slide/landing_slide";
import MailBuilder from "./mail_slide/mail_slide";
import VideoBuilder from "./video_slide/video_slide";
import AudioBuilder from "./audio_slide/audio_slide";
import LetterBuilder from "./letter_slide/letter_slide";
import CompletionSlide from "./completion_slide/completion_slide";
import styles from "./static_window.module.css";
import { BuilderContext } from "./builder_context/BuilderContext";
import SubmittedSlide from "./submitted_slide/submitted_slide";
import Background from "../shared/background";
import StaticWindowNavbar from "./static_window_navbar";

const Window = () => {
    const {
        nextButtonDisabled,
        setCurrentSlide,
        currentSlide,
        finalData,
        handleCreateMessage,
        errorMessage,
    } = React.useContext(BuilderContext);
    const slides = [
        <LandingSlide key={"landingSlide"} />,
        <MailBuilder key={"mailSlide"} />,
        <VideoBuilder key={"videoSlide"} />,
        <AudioBuilder key={"audioSlide"} />,
        <LetterBuilder key={"letterSlide"} />,
        <CompletionSlide key={"completionSlide"} />,
        <SubmittedSlide key={"submittedSlide"} />,
    ];

    const handlePageNavigation = (value: number) => {
        setCurrentSlide((prev) => prev + value);
    };

    const handleSubmit = async () => {
        handlePageNavigation(1);
        handleCreateMessage(finalData);
    };

    return (
        <div
            className={clsx(
                "absolute bg-window border-[1px] border-black h-[500px] w-[500px]"
            )}
            style={{
                boxShadow: "4px 4px 1px 1px rgba(0, 0, 0, 0.2)",
            }}
        >
            {errorMessage && (
                <p className="disableHighlight text-center animate-pulse w-full absolute bg-black text-white p-2 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    {errorMessage}
                </p>
            )}
            <StaticWindowNavbar />
            {slides.map((slide, idx) => {
                return (
                    <div
                        style={{
                            display: idx === currentSlide ? "block" : "none",
                        }}
                        key={idx}
                    >
                        {slide}
                    </div>
                );
            })}
            {currentSlide !== slides.length - 1 && (
                <div className="absolute bottom-0 w-full flex justify-between p-4">
                    <button
                        style={{ opacity: currentSlide === 0 ? 0 : 1 }}
                        className={clsx(
                            styles.slideBtn,
                            "border-[1px] border-gray-200 rounded-lg"
                        )}
                        disabled={currentSlide === 0}
                        onClick={() => handlePageNavigation(-1)}
                    >
                        Prev
                    </button>
                    {currentSlide >= slides.length - 2 && (
                        <button
                            className={clsx(
                                styles.slideBtn,
                                "border-[1px] border-gray-200 rounded-lg"
                            )}
                            disabled={nextButtonDisabled}
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    )}
                    {currentSlide < slides.length - 2 && (
                        <button
                            className={clsx(
                                styles.slideBtn,
                                "border-[1px] border-gray-200 rounded-lg"
                            )}
                            disabled={nextButtonDisabled}
                            onClick={() => handlePageNavigation(1)}
                        >
                            Next
                        </button>
                    )}
                </div>
            )}
            <Background />
        </div>
    );
};

export default Window;
