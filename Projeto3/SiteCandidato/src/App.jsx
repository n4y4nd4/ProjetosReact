import React from "react";
import Header from "./Header";
import Biography from "./Biography";
import Proposals from "./Proposals";
import Agenda from "./Agenda";
import Footer from "./Footer";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Biography />
        <Proposals />
        <Agenda />
      </main>
      <Footer />
    </div>
  );
};

export default App;
