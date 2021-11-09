import React from "react";
import format from "date-fns/format";

export default function ListEditEvent({ events }) {
  return (
    <ul>
      {events.map((event) => (
        <li key={event.id}>
          <button>
            {event.title} {/* {format(event.start, "MMM do")}  */}
            {format(event.start, "h:mm")} - {format(event.end, "p")}
          </button>
        </li>
      ))}
    </ul>
  );
}
