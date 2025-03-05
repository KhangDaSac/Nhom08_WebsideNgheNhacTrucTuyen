import React from 'react';
import { Carousel } from "flowbite-react";
import PlaylistCard from '../../cards/playlist-card/PlaylistCard';

const PlaylistCollection = (props) => {
    return (
        <div className="w-full px-4">
        <Carousel indicators={false} leftControl="◀" rightControl="▶">
          <div className="flex gap-4">
            {props.items.map((item, index) => (
                <PlaylistCard key={index}></PlaylistCard>
            ))}
          </div>
        </Carousel>
      </div>
    );
}
export default PlaylistCollection;
