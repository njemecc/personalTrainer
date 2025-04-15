"use client";
import { CardBody, CardContainer, CardItem } from "@/components/ui/card";
import VideoPlayerWithFrame from "@/components/ui/VideoPlayerWithFrame";
import { Protect } from "@clerk/nextjs";
import React from "react";
import DeleteVideoExerciseModal from "./DeleteVideoExerciseModal";

type SingleVideoExerciseCard = {
  name: string;
  url: string;
  _id: string;
};

const SingleVideoExerciseCard = ({
  name,
  url,
  _id,
}: SingleVideoExerciseCard) => {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xxl font-bold text-neutral-600 dark:text-white"
        >
          {name}
        </CardItem>

        <CardItem
          translateZ="100"
          rotateX={20}
          rotateZ={-10}
          className="w-full mt-4"
        >
          <VideoPlayerWithFrame url={url} />
        </CardItem>
        <Protect role="org:king">
          <div className="flex justify-between items-center mt-10">
            <CardItem
              translateZ={20}
              translateX={40}
              className=" text-center rounded-xl bg-red-500 dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              <DeleteVideoExerciseModal id={_id} name={name} />
            </CardItem>
          </div>
        </Protect>
      </CardBody>
    </CardContainer>
  );
};

export default SingleVideoExerciseCard;
