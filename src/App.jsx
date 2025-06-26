import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  //gameTurns terrà traccia di che cella é stat premuta da che giocatore man mano che il gioco va avanti

  const [activePlayer, setActivePlayer] = useState("X");
  //creo lo state responsabile di tenere traccia del giocatore attivo
  //lo creo in app perché dovrá informare gameboard ma anche effettuare delle modifiche di stile qua in app

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      let currentPlayer = "X";

      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }
      // se l'array dei non é vuoto e nello scorso turno il giocatore era 'X' allora il giocatore corrente deve diventare 'O'

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      //inserisco i dati sull'ultimo turno svolto in testa all'array
      //il turno é un oggetto che contiene le coordinate del quadrato premuto e il simbolo del giocatore che lo ha premuto

      return updatedTurns;
      //finalmente restituisco l'array aggiornato alla setter dello state
    });
  }
  //creo la funzione per modificare il giocatore attivo e tenere traccia delle mosse della partita, la passo come props a gameBoard in modo da potervi accedere da la

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            // se il giocatore attivo é x allora valorizzo isActive a true
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
        {/* passo la funzione per modificare il giocatore attivo e l'array che tiene traccia dei turni */}
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
