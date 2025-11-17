import React from "react";
import ReactPlayer from "react-player/youtube";

const VideoPlayerWithFrame = ({ url }: { url: string }) => {
  return (
    <div className="relative w-full aspect-video">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        config={{

            playerVars: {
              modestbranding: 1,
              rel: 0,
              disablekb: 1,
  
          },
        }}
        className="react-player"
      />
      <div className="absolute inset-0 border-8 border-primary rounded-lg z-10 pointer-events-none" />
    </div>
  );
};

export default VideoPlayerWithFrame;
