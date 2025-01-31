import React from "react";

function ScheduleList({ agendas }) {
  const sortedAgendas = agendas.sort(
    (a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
  );

  return (
    <div>
      <h2>Lista de Apresentações</h2>
      <ul>
        {sortedAgendas.map((agenda, index) => (
          <li key={index}>
            {agenda.date} - {agenda.time} | {agenda.authority}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScheduleList;
