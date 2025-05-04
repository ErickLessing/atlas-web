import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SetStateAction, useState } from "react";
import api from "@/lib/axiosInstance";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { PlusCircleIcon } from "lucide-react";
import { colors } from "@/styles/pallet";
export const AddHabitDialog = ({ userId }: { userId: number }) => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const createHabit = async () => {
    console.log(name);
    if (!name.trim()) return;
    if (!userId) return;
    await api.post("/habits", { userId, name });
    setName("");
    await queryClient.invalidateQueries({
      queryKey: ["habits", userId],
      refetchType: "active",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <PlusCircleIcon className="w-5 h-5 cursor-pointer text-[#657b83] hover:text-[#002b36]" />
      </DialogTrigger>
      <DialogContent
        className="rounded-xl border border-[#0000001a] bg-[#fdf6e3] p-6 space-y-4 shadow-lg"
        style={{ width: 380 }}
      >
        <DialogTitle className="text-lg font-semibold text-[#002b36]">
          Add a New Habit
        </DialogTitle>

        <Input
          placeholder="Enter habit name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`bg-[${colors.background}] border border-[#0000001a] placeholder:text-[${colors.border}] focus-visible:ring-0 focus-visible:ring-offset-0`}
        />

        <Button
          onClick={createHabit}
          disabled={!name.trim()}
          className="w-full bg-black border border-[#0000001a] hover:bg-[#002b36] "
        >
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};
