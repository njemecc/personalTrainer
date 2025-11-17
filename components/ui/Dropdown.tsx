"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllExercises } from "@/lib/actions/exercise.actions";

type DropdownProps = {
  value?: { name: string; url: string };
  onChangeHandler?: (value: { name: string; url: string }) => void;
};

type ExerciseFromDb = {
  _id: string;
  name: string;
  url: string;
};

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [exercises, setExercises] = useState<ExerciseFromDb[]>([]);
  const [selectedValue, setSelectedValue] = useState<string | undefined>();

  useEffect(() => {
    const fetchExercises = async () => {
      const exercisesList = await getAllExercises();
      setExercises(exercisesList);
    };

    fetchExercises();
  }, []);

  useEffect(() => {
    if (value) {
      const selectedExercise = exercises.find(
        (exercise) =>
          exercise.name === value.name && exercise.url === value.url
      );
      if (selectedExercise) {
        setSelectedValue(selectedExercise._id);
      }
    }
  }, [value, exercises]);

  const handleValueChange = (value: string) => {
    const selectedExercise = exercises.find((ex) => ex._id === value);
    if (selectedExercise) {
      const newValue = {
        name: selectedExercise.name,
        url: selectedExercise.url,
      };
      setSelectedValue(value);
      onChangeHandler?.(newValue);
    }
  };

  return (
    <Select onValueChange={handleValueChange} value={selectedValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Vežba" />
      </SelectTrigger>
      <SelectContent>
        {exercises.map((exercise) => (
          <SelectItem key={exercise._id} value={exercise._id}>
            {exercise.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
