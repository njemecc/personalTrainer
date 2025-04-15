import { getAllVideoExercises } from "@/lib/actions/exerciseVideo.actions";
import SingleVideoExerciseCard from "./SingleVideoExerciseCard";
import { Video } from "@/types/exerciseVideo";

const AllWorkoutVideos = async () => {
  const allVideos = await getAllVideoExercises();

  return (
    <div className="px-4">
      <h1 className="text-lg md:text-3xl text-center mt-10 mb-6">
        Sve video vežbe
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allVideos?.map((video: Video) => (
          <SingleVideoExerciseCard
            key={video._id}
            name={video.name}
            _id={video._id}
            url={video.url}
          />
        ))}
      </div>
    </div>
  );
};

export default AllWorkoutVideos;
