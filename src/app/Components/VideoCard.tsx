"use client"

import { useRef, useState } from "react"
import "../styles/nibbles.css"
import VideoHeader from "./VideoHeader";
import VideoFooter from "./VideoFooter";

interface VideoCardProps {
    channel: string;
    avatarSrc: string;
    song: string;
    url: string;
    likes: number;
    shares: number;
}

export default function VideoCard(props: VideoCardProps){

    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState<Boolean>(false);
    const onVideoPress=  () => {
        if(isVideoPlaying){
            //stop
            videoRef.current?.pause();
            setIsVideoPlaying(false)
        }else{
            //play  
            videoRef.current?.play(); 
            setIsVideoPlaying(true)
        }
    }

    return (
        <div className="videocard">
            <VideoHeader/>
            <video
                onClick={onVideoPress}
                ref={videoRef}
                className="videoplayer"
                src="https://static.vecteezy.com/system/resources/previews/045/366/067/mp4/industrial-machine-in-room-with-green-lighting-video.mp4"
                autoPlay loop
                />
            <VideoFooter {...props}/>
        </div>
    )
}