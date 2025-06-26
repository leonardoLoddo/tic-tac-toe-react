import { useState } from "react";
export default function Player({ initialName, symbol, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);
  function handleClick() {
    setIsEditing((editing) => !editing);
    //in react quando si aggiorna uno stato basandosi sul suo valore precedente é fortemente raccomandato passare una funzione per garantire l'ultimo valore di state
    //la funzione riceverá in un automatico l'ultimo valore dello state come parametro
    //tutto questo é necessario pereché react non aggiorna immediatamente lo state ma lo fa appena ha tempo
  }
  function handleChange(event) {
    //automaticamente react mi passa l'evento allo scattare dello stesso come parametro della funzione
    //event.target é l'elemento che fa scattare l'evento, in questo caso il campo input
    setPlayerName(event.target.value); //aggiorno il nome del giocatore con il valore presente nell'input
  }
  let editablePlayerName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
      //onChange é l'evento che scatta all'input
    );
  }
  return (
    <li className={isActive ? "active" : ""}>
      {/* se il giocatore é attivo mostro il contorno nel suo nome */}
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? "Salva" : "Modifica"}</button>
    </li>
  );
}
