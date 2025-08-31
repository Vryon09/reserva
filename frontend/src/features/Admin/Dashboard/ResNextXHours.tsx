import { useQuery } from "@tanstack/react-query";
import type { Table } from "../types";
import Loader from "../../../ui/Loader";
import { format } from "date-fns";
import { getAllTables } from "../../../services/apiTable";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

function ResNextXHours() {
  const nextHours = 6;

  const hours = Array.from({ length: nextHours }, (_, i) => {
    return format(
      dayjs(new Date())
        .startOf("hour")
        .add(i + 1, "hour")
        .toDate(),
      "h:mm a",
    );
  });

  console.log(hours);

  const { data: tables, isPending: isTablesPending } = useQuery<Table[]>({
    queryKey: ["tables"],
    queryFn: () => getAllTables({ queryString: "nexthours", value: "6" }),
  });

  if (isTablesPending) return <Loader />;

  return (
    <div className="max-w-full overflow-x-auto pb-4">
      <h2 className="mb-4 text-lg font-semibold">
        Arriving in the next {nextHours} hours
      </h2>
      <div className="w-[1000px] overflow-x-scroll lg:w-auto">
        <div className="grid grid-cols-7 text-sm">
          <p>Hour</p>
          {hours.map((hour) => (
            <p key={hour}>{hour}</p>
          ))}
        </div>
        {tables?.map((table) => (
          <div key={table.tableName} className="grid grid-cols-7 text-sm">
            <p>{table.tableName}</p>
            {table.reservations.map((reservation) => {
              const start = hours.findIndex(
                (hour) =>
                  hour ===
                  format(
                    dayjs(reservation?.reservationDate).toDate(),
                    "h:mm a",
                  ),
              );

              return (
                <div
                  key={reservation?._id}
                  style={{ gridColumnStart: start + 2 }}
                  className="col-span-1 rounded-2xl bg-yellow-500 text-center text-white"
                >
                  <p className="line-clamp-1">{reservation?.name}</p>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResNextXHours;
