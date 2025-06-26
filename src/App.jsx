import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  function handleSelectSquare() {
    setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
  }
  //creo lo state responsabile di tenere traccia del giocatore attivo
  //lo creo in app perché dovrá informare gameboard ma anche effettuare delle modifiche di stile qua in app
  //creo la funzione per modificare il giocatore attivo, la passo come props a gameBoard in modo da potervi accedere da la
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
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activePlayer}
        />
        {/* passo la funzione per modificare il giocatore attivo e il simbolo del giocatore attivo al momento a GameBoard */}
      </div>
      LOG
    </main>
  );
}

export default App;
