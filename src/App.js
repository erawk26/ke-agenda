import { useState, useEffect } from "react";
import schedulesSvc from "./services/schedules";
import MyCalendar from "./components/MyCalendar";
import EditEvent from "./components/EditEvent";
import "./App.css";
function App() {
  const [schedules, setSchedules] = useState([]);
  const [events, setEvents] = useState([]);
  const [editEvent, seteditEvent] = useState(null);
  const onMounted = () => {
    schedulesSvc
      .getAll()
      .then((response) => {
        setSchedules(response);
      })
      .catch((error) => {
        // setErrorMsg(
        //   `We were unable to fetch the records from the server. ${error.response.data.error}`
        // );
        // console.log({ error });
        // setTimeout(() => {
        //   setErrorMsg(null);
        // }, 5000);
      });
  };
  const formatEvents = ({
    firstName,
    lastName,
    id,
    datesArr,
    comments,
    email,
    created,
    modified,
  }) =>
    datesArr
      .map((obj, i) => {
        const date = Object.keys(obj);
        const [year, month, day] = date[0].split("-");
        const arr = obj[date].map(({ start, end }, j) => {
          return {
            id: `${id}--${i + 1}${j + 1}`,
            start: new Date(
              year,
              month - 1,
              day,
              start.split(":")[0],
              start.split(":")[1]
            ),
            end: new Date(
              year,
              month - 1,
              day,
              end.split(":")[0],
              end.split(":")[1]
            ),
            title: `${firstName} ${lastName}`,
            desc: comments,
            email,
            timestamp: new Date(modified ?? created).getTime(),
          };
        });
        return arr;
      })
      .flat();
  useEffect(onMounted, []);
  useEffect(() => {
    const evts = schedules.map((s) => formatEvents(s)).flat();
    // console.log({ evts });
    setEvents([...evts]);
  }, [schedules]);
  const handleCalendarSelect = (evt) => {
    console.log(evt);
    const [eventName, data] = Object.entries(evt)[0];
    seteditEvent(evt);
  };
  const handleEventEdit = (evt) => {
    console.log(evt);
    seteditEvent(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {schedules.map((s) => (
            <li key={s.id} id={`schedule--${s.id}`}>
              {s.firstName} {s.lastName}
            </li>
          ))}
        </ul>
      </header>
      <EditEvent payload={editEvent} events={events} updateOnSubmit={handleEventEdit} />
      <MyCalendar events={events} updateOnSelect={handleCalendarSelect} />
    </div>
  );
}

export default App;
