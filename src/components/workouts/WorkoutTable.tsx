import { useMemo } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { Workout, workoutTypeAliases } from "../../types/workout.types";
import { format } from "date-fns";
import { formatDistance, formatDuration } from "../../utils/formatHelpers";


interface Props {
  workouts: Workout[];
  isLoading?: boolean;
}


export default function WorkoutTable({ workouts, isLoading }: Props) {

  const columns = useMemo<ColumnDef<Workout>[]>(
    () => [
      {
        header: "Date",
        accessorFn: (row) => row.date,
        cell: ({ getValue }) => {
          const value = getValue() as Date | null;
          return value ? format(value, "yyyy-MM-dd") : "-";
        },
      },
      {
        header: "Time",
        accessorFn: (row) => row.time,
        cell: ({ getValue }) => {
          const value = getValue() as Date | null;
          return value ? format(value, "HH:mm") : "-";
        },
      },
      {
        header: "Type",
        accessorFn: (row) => workoutTypeAliases[row.type] || row.type,
      },
      {
        header: "Distance (m)",
        accessorFn: (row) => row.distance,
        cell: ({ getValue }) => {
          const value = getValue() as number | null;
          return value != null ? formatDistance(value) : "-";
        },
      },
      {
        header: "Calories (kcal)",
        accessorFn: (row) => row.activeCalories,
        cell: ({ getValue }) => {
          const value = getValue() as number | null;
          return value != null ? `${value.toFixed(1)} kcal` : "-";
        },
      },
      {
        header: "Heart Rate",
        accessorFn: (row) => row.heartRate,
        cell: ({ getValue }) => {
          const value = getValue() as number | null;
          return value != null ? `${value.toFixed(1)} bpm` : "-";
        },
      },
      {
        header: "Elevation",
        accessorFn: (row) => row.elevationGain,
        cell: ({ getValue }) => {
          const value = getValue() as number | null;
          return value != null ? formatDistance(value) : "-";
        },
      },
      {
        header: "Total Time",
        accessorFn: (row) => row.totalTime,
        cell: ({ getValue }) => {
          const value = getValue() as string | null;
          return value ? formatDuration(value) : "-";
        },
      },
      {
        header: "Moving Time",
        accessorFn: (row) => row.movingTime,
        cell: ({ getValue }) => {
          const value = getValue() as string | null;
          return value ? formatDuration(value) : "-";
        },
      },
      {
        header: "Elapsed Time",
        accessorFn: (row) => row.elapsedTime,
        cell: ({ getValue }) => {
          const value = getValue() as string | null;
          return value ? formatDuration(value) : "-";
        },
      },
      //   {
      //     header: "Source",
      //     accessorFn: (row) => row.source,
      //     cell: ({ getValue }) => getValue() ?? "-",
      //   },
    ],
    []
  );

  const table = useReactTable<Workout>({
    data: workouts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p className="text-[#0000001a]">Loading workouts...</p>;

  return (
    <div className="overflow-x-auto w-full mx-auto mt-2 border border-[#0000001a] rounded-lg">
      <table
        style={{ borderCollapse: "collapse" }}
        className="min-w-full "
      >
        <thead className=" text-left bg-[#eee8d5] ">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, idx, all) => (
                <th
                  key={header.id}
                  className={`p-2 font-medium text-sm ${
                    idx !== all.length - 1 ? "border-r border-[#0000001a]" : ""
                  }`}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-[#fdf6e3]">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t border-[#eee8d5] text-right">
              {row.getVisibleCells().map((cell, idx, all) => (
                <td
                  key={cell.id}
                  className={`p-2 text-sm ${
                    idx !== all.length - 1 ? "border-r border-[#eee8d5]" : ""
                  }`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
