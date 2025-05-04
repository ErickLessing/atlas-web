import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axiosInstance";
import { useState } from "react";

const DeleteHabitDialog = ({ habitId }: { habitId: number }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { mutateAsync } = useMutation({
    mutationFn: async () => await api.delete(`/habits/${habitId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      setOpen(false); // ✅ close the dialog
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button>
          <Trash className="w-4 h-4 cursor-pointer text-red-500 hover:text-red-700" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-80 space-y-4">
        <h2 className="text-lg font-semibold">Delete Habit</h2>
        <p>Are you sure you want to permanently delete this habit?</p>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive" onClick={() => mutateAsync()}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteHabitDialog;
