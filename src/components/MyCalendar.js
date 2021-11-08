import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const DnDCalendar = withDragAndDrop(Calendar);
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
export default function MyCalendar({ events, updateOnSelect }) {
  const handleSlotSelect = (evt) => updateOnSelect({ create: evt });
  const handleEventDrop = (evt) => updateOnSelect({ move: evt });
  const handleEventSelect = (evt) => updateOnSelect({ select: evt });
  const now = new Date();
  return (
    <DnDCalendar
      selectable
      localizer={localizer}
      events={events}
      defaultView={Views.WEEK}
      scrollToTime={now}
      defaultDate={now}
      onEventDrop={handleEventDrop}
      onSelectEvent={handleEventSelect}
      onSelectSlot={handleSlotSelect}
      style={{ height: "900px" }}
    />
  );
}
