import React, { useState } from "react";
import ScheduleForm from "../components/ScheduleForm";

function Agendas({ authorities }) {
  const [agendas, setAgendas] = useState([]);

  const handleAddAgenda = (newAgenda) => {
    setAgendas((prev) => [...prev, newAgenda]);
  };

  return (
    <div>
      <ScheduleForm onAddAgenda={handleAddAgenda} authorities={authorities} />
      <div>
        <h2>Lista de Apresentações</h2>
        <ul>
          {agendas.map((agenda, index) => (
            <li key={index}>
              {agenda.date} às {agenda.time} - {agenda.authority}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Agendas;
