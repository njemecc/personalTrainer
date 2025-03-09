import { CardBody, CardContainer, CardItem } from "@/components/ui/card";
import React from "react";
import DeleteWorkoutModal from "./DeleteWorkoutModal";
import CreateUpdateExerciseModal from "./CreateUpdateExerciseModal";
import { Protect } from "@clerk/nextjs";
import ExerciseDescriptionModal from "./ExerciseDescriptionModal";

type SingleExerciseCardParams = {
  name: string;
  sets: number;
  reps: number;
  url: string;
  _id: string;
  userId: string;
  dayId: string;
  exerciseId: string;
  description: string;
};

const SingleExerciseCard = ({
  name,
  sets,
  reps,
  url,
  _id,
  userId,
  dayId,
  exerciseId,
  description,
}: SingleExerciseCardParams) => {
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
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 flex justify-between"
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
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin"
          ></iframe>
        </CardItem>

        {
          // detalji
        }
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            translateX={40}
            className=" text-center rounded-xl bg-primary dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            <ExerciseDescriptionModal description={description} name={name} />
          </CardItem>
        </div>
        <Protect role="org:king">
          <div className="flex justify-between items-center mt-10">
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
        </Protect>
      </CardBody>
    </CardContainer>
  );
};

export default SingleExerciseCard;
