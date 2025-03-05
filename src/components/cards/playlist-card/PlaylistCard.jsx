import { Card } from "flowbite-react";
import React from 'react';
import image from '../../../assets/images/playlist/image.jpg'

const PlaylistCard = () => {
    return (
        <Card
            className="max-w-sm w-[300px] m-5"
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            imgSrc={image}
        >
            <h6 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Thiên hạ nghe gì?
            </h6>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                Những gì người bên cạnh đang nghe.
            </p>
        </Card>
    );
}

export default PlaylistCard;
