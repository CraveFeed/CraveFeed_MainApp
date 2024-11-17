"use client";

import { useRef, useState, useEffect } from "react";
import "../styles/nibbles.css";
import VideoHeader from "./VideoHeader";
import VideoFooter from "./VideoFooter";

interface VideoCardProps {
    channel: string;
    avatarSrc: string;
    song: string;
    url: string;
    likes: number;
    shares: number;
    title: string;
}

export default function VideoCard(props: VideoCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isManualPause, setIsManualPause] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isManualPause) {
                    // Play the video when in view and not manually paused
                    videoRef.current?.play();
                    setIsVideoPlaying(true);
                } else {
                    // Pause the video when out of view
                    videoRef.current?.pause();
                    setIsVideoPlaying(false);
                }
            },
            { threshold: 0.75 }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, [isManualPause]); // Dependency on isManualPause to handle user clicks

    const onVideoPress = () => {
        if (isVideoPlaying) {
            videoRef.current?.pause();
            setIsManualPause(true); // Set manual pause when clicked to pause
        } else {
            videoRef.current?.play();
            setIsManualPause(false); // Reset manual pause when clicked to play
        }
        setIsVideoPlaying(!isVideoPlaying);
    };

    return (
        <div className="videocard">
            <VideoHeader />
            <video
                onClick={onVideoPress}
                ref={videoRef}
                className="videoplayer"
                src={props.url}
                autoPlay={false}
                loop
            />
            <VideoFooter {...props} />
        </div>
    );
}
