import React, { useState } from "react";
import "../styles/Forms.css";

function ScheduleForm({ onAddAgenda, authorities, existingSchedules = [] }) {
  const [formData, setFormData] = useState({
    authority: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isTimeConflict = (newDate, newTime) => {
    const newDateTime = new Date(`${newDate}T${newTime}`);

    return existingSchedules.some(({ date, time }) => {
      const scheduledDateTime = new Date(`${date}T${time}`);
      const diff = Math.abs(newDateTime - scheduledDateTime) / (1000 * 60);
      return diff < 15;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { date, time } = formData;

    if (isTimeConflict(date, time)) {
      alert(
        "Horário inválido. Deve haver pelo menos 15 minutos de intervalo entre os agendamentos."
      );
      return;
    }

    onAddAgenda(formData);

    setFormData({
      authority: "",
      date: "",
      time: "",
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Agendar Apresentação</h2>

      {/* Dropdown para listar autoridades */}
      <label htmlFor="authority">Autoridade:</label>
      <select
        id="authority"
        name="authority"
        value={formData.authority}
        onChange={handleChange}
        required
      >
        <option value="">Selecione uma autoridade</option>
        {authorities.map((auth, index) => (
          <option
            key={index}
            value={`${auth.country}/${auth.name}/${auth.role}`}
          >
            {auth.country} / {auth.name} / {auth.role}
          </option>
        ))}
      </select>

      {/* Campo de data */}
      <label htmlFor="date">Data:</label>
      <input
        id="date"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        min="2025-11-18"
        max="2025-11-19"
      />

      {/* Campo de horário */}
      <label htmlFor="time">Horário:</label>
      <input
        id="time"
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
      />

      {/* Botão de envio */}
      <button type="submit">Agendar</button>
    </form>
  );
}

export default ScheduleForm;
