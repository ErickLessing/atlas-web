import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Archive } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axiosInstance";
import { useState } from "react";

const ArchiveHabitDialog = ({ habitId }: { habitId: number }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { mutateAsync } = useMutation({
    mutationFn: async () =>
      await api.put(`/habits/${habitId}`, { isActive: false }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      setOpen(false); // ✅ close the dialog
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button>
          <Archive className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-700" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-80 space-y-4">
        <h2 className="text-lg font-semibold">Archive Habit</h2>
        <p>This will hide the habit but keep its logs and history. Continue?</p>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={() => mutateAsync()}>Archive</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArchiveHabitDialog;
