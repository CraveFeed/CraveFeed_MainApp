import { Flex } from "antd";
import "../../styles/nibbles.css";
import VideoCard from "@/app/Components/VideoCard";

export default function ChefsCorner() {
    // Array of video card data
    const videoData = [
        {
            channel: "Vibhor Phalke",
            avatarSrc: "https://media.licdn.com/dms/image/v2/D4D03AQGTntx-N5e2lw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1676827911193?e=1736380800&v=beta&t=QL9g0XW1DlsXbL2GFQ7cl7hL7l73uE1fLdyueImtC8k",
            song: "song1",
            url: "https://res.cloudinary.com/dpuzfcod1/video/upload/v1731029062/hiihhe95y9tqfkwfydmv.mp4",
            likes: 100,
            shares: 20,
        },
        {
            channel: "Snehal Saurabh",
            avatarSrc: "https://pbs.twimg.com/profile_images/1691871569478561792/k1H_VfPB_400x400.jpg",
            song: "song2  dshf;alsd   s';dlkjf;lk jsdfd",
            url: "https://res.cloudinary.com/dpuzfcod1/video/upload/v1731029364/z4emh5nevszwrjcyewx7.mp4",
            likes: 200,
            shares: 30,
        },
        {
            channel: "douuud57",
            avatarSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8vLRigYzD9al6y-B-BMFT_WEH-KTkh56asA&s",
            song: "song2  dshf;alsd   s';dlkjf;lk jsdfd",
            url: "https://res.cloudinary.com/dpuzfcod1/video/upload/v1731029811/jd3dpd2v3zjwt28ky6bo.mp4",
            likes: 12234,
            shares: 233,
        },
        // Add more objects for additional VideoCards
    ];

    return (
        <Flex justify="center" >
            <div className="app_reels" style={{ color: "white" }}>
                {videoData?.map((data, index) => (
                    <VideoCard
                        key={index}
                        channel={data.channel}
                        avatarSrc={data.avatarSrc}
                        song={data.song}
                        url={data.url}
                        likes={data.likes}
                        shares={data.shares}
                    />
                ))}
            </div>
        </Flex>
    );
}
