import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { DialogClose } from "@radix-ui/react-dialog";

const ExerciseDescriptionModal = ({
  description,
  name,
}: {
  description: string;
  name: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="md:w-1/4">O vežbi</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>
            Nešto detaljnije o izvođenju ove vežbe
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">
          {description}
        </div>
        <DialogFooter>
          <DialogClose>
            <Button>zatvori</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseDescriptionModal;
