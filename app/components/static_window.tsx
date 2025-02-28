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
        <LandingSlide />,
        <MailBuilder />,
        <VideoBuilder />,
        <AudioBuilder />,
        <LetterBuilder />,
        <CompletionSlide />,
        <SubmittedSlide />,
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
            <div
                className={clsx(
                    "border-b-[1px] border-black p-1 flex justify-center",
                    "disableHighlight"
                )}
            >
                <div className="w-4 h-4 aspect-square border-[1px] border-black flex justify-center items-center absolute top-1 left-1 m-1 cursor-pointer hover:text-white hover:bg-black">
                    <div className="top-[-8.5px] absolute text-lg">✕</div>
                </div>
                <div className="font-Silkscreen text-base">Message Builder</div>
            </div>
            {slides.map((slide, idx) => {
                return (
                    <div
                        style={{
                            display: idx === currentSlide ? "block" : "none",
                        }}
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
        </div>
    );
};

export default Window;
