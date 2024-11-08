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
                src={props.url}
                autoPlay loop
                />
            <VideoFooter {...props}/>
        </div>
    )
}