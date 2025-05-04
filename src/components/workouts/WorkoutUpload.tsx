import { useState } from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";

export default function WorkoutUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (userLoading) return;
    if (!user) {
      setMessage("User not found.");
      return;
    }

    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    setUploading(true);
    setMessage("Uploading...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `http://localhost:5239/api/workout/upload?userProfileId=${user.id}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken") ?? ""}`,
          },
        }
      );

      if (response.ok) {
        console.log(response);
        setMessage("File uploaded successfully!");
        queryClient.invalidateQueries({ queryKey: ["workouts"] });
      } else {
        const error = await response.text();
        setMessage(`Upload failed: ${error}`);
      }
    } catch (error) {
      setMessage("An error occurred while uploading the file.");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 w-full bg-[#fdf6e3]">
      <p className="text-sm text-[#586e75]">
        Upload a `.xlsx` workout file exported from your tracker.
      </p>

      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
        disabled={uploading}
        className="block w-full text-sm text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#eee8d5] file:text-[#002b36] hover:file:bg-[#e0dbc7]"
      />

      <Button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full bg-[#fdf0c2] border border-[#0000001a] text-[#002b36] hover:bg-[#eee8d5] disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </Button>

      {message && (
        <p className="text-sm text-[#657b83] whitespace-pre-wrap">{message}</p>
      )}
    </div>
  );
}
