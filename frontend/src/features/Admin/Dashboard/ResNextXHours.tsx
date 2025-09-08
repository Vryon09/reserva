import { useQuery } from "@tanstack/react-query";
import type { Table } from "../types";
// import Loader from "../../../ui/Loader";
import { format } from "date-fns";
import { getAllTables } from "../../../services/apiTable";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import Card from "../../../ui/Card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

dayjs.extend(utc);
dayjs.extend(timezone);

function ResNextXHours() {
  const nextHours = 3;

  const hours = Array.from({ length: nextHours }, (_, i) => {
    return format(
      dayjs(new Date())
        .startOf("hour")
        .add(i + 1, "hour")
        .toDate(),
      "h:mm a",
    );
  });

  // console.log(hours);

  const { data: tables, isPending: isTablesPending } = useQuery<Table[]>({
    queryKey: ["tables", nextHours],
    queryFn: () =>
      getAllTables({ queryString: "nexthours", value: `${nextHours}` }),
  });

  // if (isTablesPending) return <Loader />;

  return (
    <Card>
      <div className="max-w-full overflow-x-auto pb-4">
        <h2 className="mb-4 text-lg font-semibold">
          Arriving in the next {nextHours} hours
        </h2>
        <div className="overflow-x-scroll lg:w-auto">
          <div
            style={{
              gridTemplateColumns: `repeat(${nextHours + 1}, minmax(0, 1fr))`,
            }}
            className="grid border-b border-neutral-300 py-2 text-sm"
          >
            <p className="font-semibold">Hour</p>
            {isTablesPending
              ? Array.from({ length: nextHours }, (_, i) => (
                  <div className="mx-2" key={i}>
                    <Skeleton />
                  </div>
                ))
              : hours.map((hour) => <p key={hour}>{hour}</p>)}
          </div>
          {isTablesPending
            ? Array.from({ length: 10 }, (_, i) => (
                <div className="grid border-b border-neutral-300 py-2" key={i}>
                  <Skeleton />
                </div>
              ))
            : tables?.map((table) => (
                <div
                  key={table.tableName}
                  style={{
                    gridTemplateColumns: `repeat(${nextHours + 1}, minmax(0, 1fr))`,
                  }}
                  className="grid border-b border-neutral-300 py-2 text-sm"
                >
                  <p className="font-semibold">{table.tableName}</p>
                  {table.reservations.map((reservation) => {
                    const start = hours.findIndex(
                      (hour) =>
                        hour ===
                        format(
                          dayjs(reservation?.reservationDate).toDate(),
                          "h:mm a",
                        ),
                    );

                    const colStart = start + 2;

                    return (
                      <div
                        key={reservation?._id}
                        title={`${reservation?.name} (${table.tableName})`}
                        style={{
                          gridColumnStart: colStart,
                          backgroundColor:
                            colStart <= 3
                              ? "#ef4444"
                              : colStart <= 5
                                ? "#f97316"
                                : "#22c55e",
                        }}
                        className="rounded px-4 text-center text-white"
                      >
                        <p className="line-clamp-1">{reservation?.name}</p>
                      </div>
                    );
                  })}
                </div>
              ))}
        </div>
      </div>
    </Card>
  );
}

export default ResNextXHours;
