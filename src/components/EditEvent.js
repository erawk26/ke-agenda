import { useEffect, useState } from "react";
export default function EditEvent({ payload, updateOnSubmit }) {
  const [formData, setFormData] = useState(null);
  useEffect(() => {
    if (payload && "create" in payload) {
      const { start, end, slots } = payload.create;
      setFormData({ start, end, slots });
      // todo: we will need to check for overlap and present a form to assign the time slot to someone and save it
    }
    if (payload && "move" in payload) {
      const { start, end, event } = payload.move;
      // todo move this event to the new time slot
      // then we will need to check for overlap and present a form to assign the time slot to someone and save it
    }
    if (payload && "select" in payload) {
      const { start, end } = payload.select;
      setFormData({ start, end, slots:[start] });
      // todo: find all the clients available in the selected time, then present a form to assign the time slot to someone and save it
      // still undecided on how to handle the overlap apptointments not chosen by the user
      // i think leaving all the available timeslots visible is important for planning... at least for now

    }
  }, [payload]);
  return formData ? <div>Valid Data</div> : null;
}
