import { useEffect, useState } from "react";
export default function EditEvent({
  payload,
  events,
  updateOnSubmit,
}) {
  const [formData, setFormData] = useState(null);
  const getAvailableClients = ({ slots }) => {
    const selection = {
      start: new Date(slots[0]).getTime(),
      end: new Date(slots[slots.length - 1]).getTime(),
    };
    const softMatches = events.filter(
      (event) =>
        event.start.getTime() >= selection.start &&
        event.end.getTime() <= selection.end
    );
    // const exectMatches = events.filter(
    //   (event) =>
    //     event.start.getTime() === selection.start &&
    //     event.end.getTime() === selection.end
    // );
    // debugger;
    return softMatches
  };
  useEffect(() => {
    if (payload && "create" in payload) {
      const { start, end, slots } = payload.create;
      const selectedEvent = { start, end, slots };
      setFormData(getAvailableClients(selectedEvent));
      // todo: we will need to check for overlap and present a form to assign the time slot to someone and save it
    }
    if (payload && "move" in payload) {
      const { start, end, event } = payload.move;
      // todo move this event to the new time slot
      // then we will need to check for overlap and present a form to assign the time slot to someone and save it
    }
    if (payload && "select" in payload) {
      const { start, end } = payload.select;
      const selectedEvent = { start, end, slots: [start, end] };
      setFormData(getAvailableClients(selectedEvent));
      // todo: find all the clients available in the selected time, then present a form to assign the time slot to someone and save it
      // still undecided on how to handle the overlap apptointments not chosen by the user
      // i think leaving all the available timeslots visible is important for planning... at least for now
    }
  }, [payload]);
  return formData ? (
    <div>
      Start: {formData.start.toString()}
      <br />
      End: {formData.end.toString()}
    </div>
  ) : null;
}
