import React from "react";
import styles from "./Proposals.module.css";
import Img from "./proposta1.jpg";
import Img2 from "./proposta2.jpg";
import Img3 from "./proposta3.jpg";
import Img4 from "./proposta4.jpg";
import Img5 from "./proposta5.jpg";
import Img6 from "./proposta7.jpg";

const Proposals = () => {
  const propostasCards = [
    {
      title: "Educação Acessível e de Qualidade",
      description:
        "Compromisso em garantir que todas as crianças tenham acesso a uma educação de qualidade, com investimento em escolas públicas e programas de apoio a alunos em situação de vulnerabilidade.",
      image: Img,
    },
    {
      title: "Comunidade em Ação",
      description:
        " Implementação de um programa de engajamento comunitário que incentive ações solidárias, como doação de alimentos e eventos culturais. O objetivo é promover a união entre os cidadãos, fortalecer laços sociais e fomentar uma cultura de solidariedade nas comunidades.",
      image: Img2,
    },

    {
      title: "Transporte Público Eficiente",
      description:
        "Melhoria do transporte público nas comunidades, com investimentos em infraestrutura que facilitem a mobilidade e conectividade, tornando o transporte mais acessível e sustentável.",
      image: Img3,
    },
    {
      title: "Apoio à Maternidade e à Paternidade",
      description:
        "Desenvolvimento de políticas que ofereçam suporte às mães e pais, incluindo licença parental ampliada e programas de educação parental. O objetivo é garantir que as famílias tenham os recursos necessários para criar seus filhos em um ambiente saudável e acolhedor, promovendo o bem-estar infantil e o equilíbrio entre trabalho e vida pessoal.",
      image: Img4,
    },

    {
      title: "Saúde Mental",
      description:
        " Implementação de iniciativas para promover a saúde mental, incluindo a expansão de serviços de apoio psicológico nas escolas e comunidades, e campanhas de conscientização sobre o assunto.",
      image: Img6,
    },

    {
      title: "Empoderamento Jovem",
      description:
        "Criação de programas para envolver os jovens na política e na tomada de decisões, garantindo que suas vozes sejam ouvidas e consideradas nas questões que os afetam diretamente.",
      image: Img5,
    },
  ];

  const outrasPropostas = [
    "-Igualdade de Gênero",
    "-Apoio às Artes e Cultura",
    "-Habitação Acessível",
    "-Segurança Pública",
  ];

  return (
    <section id="propostas" className={styles.propostas}>
      <h2>Propostas</h2>
      <div className={styles.cards}>
        {propostasCards.map((proposta, index) => (
          <div key={index} className={styles.card}>
            <img src={proposta.image} alt={proposta.title} />
            <h3>{proposta.title}</h3>
            <p>{proposta.description}</p>
          </div>
        ))}
      </div>
      <ul className={styles.outras}>
        <h3> Outras Propostas:</h3>
        {outrasPropostas.map((proposta, index) => (
          <li key={index}>{proposta}</li>
        ))}
      </ul>
    </section>
  );
};

export default Proposals;
