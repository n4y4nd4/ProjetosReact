import React from "react";
import styles from "./Biography.module.css";
import Img from "./louis3.jpg";
import "./App.css";

const Biography = () => {
  return (
    <section id="biografia" className={styles.biography}>
       <h1>Louis Tomlinson</h1>
      <img src={Img} alt="Louis Tomlinson" />
      <div>
        <h2>Biografia</h2>
        <p>
          Louis Tomlinson cresceu em Doncaster, onde desenvolveu uma paixão por
          ajudar sua comunidade desde jovem. Com uma forte ética de trabalho e
          um espírito generoso, ele se destacou em projetos sociais enquanto se
          tornava um artista reconhecido. Ao entrar para a política, Louis
          trouxe sua habilidade de conexão com as pessoas, ouvindo suas
          preocupações e lutando por seus direitos. Ele é um defensor ativo de
          causas sociais, focando na promoção da igualdade, educação e saúde
          mental, sempre buscando empoderar os jovens a terem voz nas decisões
          que afetam suas vidas. Com uma visão de futuro, Louis Tomlinson
          acredita que a mudança é possível. Seu lema, "Precisamos ter fé no
          futuro", reflete seu compromisso em construir uma sociedade mais justa
          e inclusiva para todos.
        </p>
      </div>
    </section>
  );
};

export default Biography;
