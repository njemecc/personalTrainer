"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/card";
import React, { useEffect } from "react";
import DeleteWorkoutModal from "./DeleteWorkoutModal";
import CreateUpdateExerciseModal from "./CreateUpdateExerciseModal";

type SingleWorkoutCardParams = {
  name: string;
  sets: number;
  reps: number;
  url: string;
  _id: string;
  userId: string;
  dayId: string;
  exerciseId: string;
};

const SingleWorkoutCard = ({
  name,
  sets,
  reps,
  url,
  _id,
  userId,
  dayId,
  exerciseId,
}: SingleWorkoutCardParams) => {
  useEffect(() => {
    const handleContextMenu = (event: Event) => {
      event.preventDefault();
    };

    document
      .getElementById(`iframe-${_id}`)!
      .addEventListener("contextmenu", handleContextMenu);

    return () => {
      document
        .getElementById(`iframe-${_id}`)!
        .removeEventListener("contextmenu", handleContextMenu);
    };
  }, [_id]);

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {name}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {`${sets} serije ${reps} ponavljanja`}
        </CardItem>
        <CardItem
          translateZ="100"
          rotateX={20}
          rotateZ={-10}
          className="w-full mt-4"
        >
          <iframe
            id={`iframe-${_id}`}
            className="w-full  md:h-[15rem]"
            src={`${url}`}
            title={`${name}`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            translateX={-40}
            className="px-4 py-2 rounded-xl text-xs font-normal text-black"
          >
            <CreateUpdateExerciseModal
              dayId={dayId}
              userId={userId}
              name={name}
              url={url}
              exerciseId={_id}
              reps={reps}
              sets={sets}
              variant="update"
            />
          </CardItem>
          <CardItem
            translateZ={20}
            translateX={40}
            className=" text-center rounded-xl bg-red-500 dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            <DeleteWorkoutModal userId={userId} name={name} id={_id} />
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default SingleWorkoutCard;
