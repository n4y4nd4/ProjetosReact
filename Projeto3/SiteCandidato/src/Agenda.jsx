import React from "react";
import "./Agenda.css";

const Agenda = () => {
  const events = [
    { date: "01/10", event: "Reunião sobre propostas de educação." },
    { date: "02/10", event: "Visita a uma escola local." },
    { date: "03/10", event: "Evento comunitário sobre saúde mental." },
    { date: "04/10", event: "Encontro com ativistas ambientais." },
    {
      date: "05/10",
      event: "Participação em um painel sobre habitação acessível.",
    },
    {
      date: "06/10",
      event: "Jantar de agradecimento com voluntários da campanha.",
    },
  ];

  return (
    <section id="agenda" className="agenda">
      <h2>Agenda</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            {event.date} - {event.event}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Agenda;
