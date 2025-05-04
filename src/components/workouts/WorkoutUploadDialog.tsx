import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import WorkoutUpload from "./WorkoutUpload";

const WorkoutUploadDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-[#fdf6e3] text-[#002b36] border border-[#0000001a] hover:bg-[#eee8d5]" variant="outline">Upload Workout</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#fdf6e3] ">
        <DialogHeader>
          <DialogTitle>Upload Workout</DialogTitle>
        </DialogHeader>
        <WorkoutUpload />
      </DialogContent>
    </Dialog>
  );
};

export default WorkoutUploadDialog;
