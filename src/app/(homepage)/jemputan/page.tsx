"use client";

import AppPadding from "@/components/shared/app-padding";
import { DataTable } from "@/components/shared/ui/datatable";
import LoadingTable from "@/components/shared/ui/loading-table";
import { db } from "@/configs/firebase";
import { ColumnDef } from "@tanstack/react-table";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

function JemputanPage() {
  const [pickups, setPickups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "pickups"),
      (snapshot) => {
        const today = new Date();
        const todayDateString = today.toISOString().slice(0, 10);

        const todayPickups = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((item: any) => {
            if (!item.created_at) return false;

            const createdAt =
              typeof item.created_at === "string"
                ? item.created_at
                : item.created_at.toDate().toISOString();

            return (
              createdAt.startsWith(todayDateString) && item.siswa?.type === "SD"
            );
          });

        setPickups(todayPickups);
        setLoading(false);
      },
      (error) => {
        console.log({ error });
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const tableHeader: ColumnDef<any>[] = [
    {
      accessorKey: "no",
      header: "No",
      cell: (props) => {
        const row = props.row.index + 1;
        return row;
      },
    },
    {
      accessorKey: "nama",
      header: "Siswa",
      cell: ({ row }) => {
        return (
          <div className="whitespace-nowrap text-ellipsis overflow-hidden max-w-40">
            <span>{row.original.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "siswa",
      header: "Siswa",
      cell: ({ row }) => {
        return (
          <div className="whitespace-nowrap text-ellipsis overflow-hidden max-w-40">
            <span className="uppercase">
              {row.original.siswa?.kelas[0]?.nama}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Terkonfirmasi",
      cell: ({ row }) => {
        return (
          <div className="whitespace-nowrap text-ellipsis overflow-hidden max-w-40">
            {row.original?.status ? (
              <div className="w-fit text-xs bg-green-50 text-green-500 rounded-lg px-2">
                Ya
              </div>
            ) : (
              <div className="w-fit text-xs bg-red-50 text-red-500 rounded-lg px-2">
                Tidak
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "is_used",
      header: "Sudah Sampai",
      cell: ({ row }) => {
        return (
          <div className="whitespace-nowrap text-ellipsis overflow-hidden max-w-40">
            {row.original?.status ? (
              <div className="w-fit text-xs bg-green-50 text-green-500 rounded-lg px-2">
                Ya
              </div>
            ) : (
              <div className="w-fit text-xs bg-red-50 text-red-500 rounded-lg px-2">
                Tidak
              </div>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <AppPadding className="pt-10">
      <p className="font-bold text-xl text-center">Daftar Jemputan Hari Ini</p>
      <div className="p-5">
        {loading ? (
          <LoadingTable />
        ) : (
          <DataTable columns={tableHeader} data={pickups} />
        )}
        {!loading && pickups.length === 0 && (
          <p className="text-sm text-center text-gray-500 mt-4">
            Belum ada data jemputan.
          </p>
        )}
      </div>
    </AppPadding>
  );
}

export default JemputanPage;
