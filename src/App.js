import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./style.css";
import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  const handleSearch = async () => {
    if (input === "") {
      alert("Preencha algum CEP!");
      return;
    }

    try {
      const res = await api.get(`${input}/json`);
      //se o usuário pesquisar um cep que não existe o res.data vai ter um obj {erro:true}
      if(res.data.erro){
        alert("CEP não encontrado!")
        setInput("");
        return;
      }

      console.log(res.data)
      setCep(res.data);
    } catch {
      alert("Ops! Erro ao buscar...");
    }
    
  };

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={8}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Estado: {cep.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;
