import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
export default function MyCalendar({ events, updateOnSelect }) {
  const handleSlotSelect = (evt) => updateOnSelect({ slotSelect: evt });
  const handleEventSelect = (evt) => updateOnSelect({ eventSelect: evt });

  return (
    <Calendar
      selectable
      localizer={localizer}
      events={events}
      defaultView={Views.WEEK}
      scrollToTime={new Date(1970, 1, 1, 6)}
      defaultDate={new Date(2015, 3, 12)}
      onSelectEvent={handleEventSelect}
      onSelectSlot={handleSlotSelect}
      style={{ height: "900px" }}
    />
  );
}
