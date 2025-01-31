import React from "react";
import FetchData from "./FetchData";
import "./App.css";

function App() {
  return (
    <div>
      <header>
        <h1>Aplicação JSONPlaceholder</h1>
      </header>
      <main>
        <FetchData />
      </main>
      <footer>
        <p>© 2024 Minha Aplicação</p>
      </footer>
    </div>
  );
}

export default App;
