import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations"; //array che contiene le possibili combinazioni di vittoria

// funzione helper che deriva dallo state gameTurns il giocatore attivo
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

//outsourcing della logica per drecreatare il vincitore
function deriveWinner(gameBoard, players) {
  let winner; //la variabile che conterrá il simbolo vincitore
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    //per ogni casella richiesta da questa combinazione vincente salvo il simbolo contenuto
    if (
      firstSquareSymbol &&
      firstSquareSymbol == secondSquareSymbol &&
      firstSquareSymbol == thirdSquareSymbol
    ) {
      //se il primo simbolo é truthy (quindi non null perché qualcuno ci ha premuto), controllo se é uguale ai simboli nelle altre due celle
      // se un giocatore ha premuto in tutte e tre le celle della combinazione vincente ha vinto
      // di conseguenza salvo il nome vincente nella variabile winner
      winner = players[firstSquareSymbol]; //dallo state players prendo il valore (che rappresenta il nome del giocatore) alla chiave del simbolo vincente
      return winner;
    }
  }
}

//outsourcing logica di generazione gameBoard
function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])]; // duplichiamo l'array iniziale per evitare il passaggio per riferimento
  for (const turn of gameTurns) {
    const { square, player } = turn; //da ciascun turno creo due costanti tramite destructuring: 'square' conterrá le coordinate della cella e 'player' il simbolo di chi la ha cliccata
    const { row, col } = square; //con il destructuring, creo due costanti dove salvo la riga e la colonna di ogni cella
    gameBoard[row][col] = player; //richiamo le costanti appena valorizzate per inserire nella giusta cella della tabella il giusto simbolo
  }
  return gameBoard;
}
const PLAYERS = {
  X: "PLAYER 1",
  O: "PLAYER 2",
};

const INITIAL_GAME_BOARD = [
  //questo array rappresenta la tabella da gioco
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [players, setPlayers] = useState(PLAYERS); //questo state conterrà i nomi giocatore

  const [gameTurns, setGameTurns] = useState([]); //gameTurns terrà traccia di che cella é stat premuta da che giocatore man mano che il gioco va avanti

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner; //se dopo 9 turni non abbiamo un vincitore ci troviamo in un pareggio

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        //inserisco i dati sull'ultimo turno svolto in testa all'array
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer }, //il turno é un oggetto che contiene le coordinate del quadrato premuto e il simbolo del giocatore che lo ha premuto
        ...prevTurns,
      ];
      return updatedTurns; //finalmente restituisco l'array aggiornato alla setter dello state
    });
  }

  function handleRestart() {
    setGameTurns([]); // per riavviare il gioco su una nuova partita basta svuotare lo state dei turni
  }

  function handleNameChange(symbol, newName) {
    setPlayers((prevPlayers) => ({
      ...prevPlayers, //nomi giocatori precedenti
      [symbol]: newName, //sovrascrivo il nome associato al simbolo inserito come parametro con il nuovo nome
    }));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            // se il giocatore attivo é x allora valorizzo isActive a true
            onNameChange={handleNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange={handleNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        {/* passo la funzione per modificare il giocatore attivo e l'array che tiene traccia dei turni */}
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
