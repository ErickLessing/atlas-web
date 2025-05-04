import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axiosInstance";

const EditHabitDialog = ({
  habit,
}: {
  habit: { id: number; name: string };
}) => {
  const [name, setName] = useState(habit.name);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { mutateAsync } = useMutation({
    mutationFn: async () => await api.put(`/habits/${habit.id}`, { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      setOpen(false); // ✅ close the dialog
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button>
          <Pencil className="w-4 h-4 cursor-pointer text-gray-600 hover:text-gray-800" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-80 space-y-4">
        <h2 className="text-lg font-semibold">Edit Habit</h2>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        <Button onClick={() => mutateAsync()}>Save</Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditHabitDialog;
