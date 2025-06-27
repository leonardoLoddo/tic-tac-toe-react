// import { useState } from "react";

export default function GameBoard({ onSelectSquare, board }) {
  //   const [gameBoard, setGameBoard] = useState(initialGameBoard);
  //   function handleSelectSquare(rowIndex, colIndex) {
  //     //se lo state contine un oggetto o array (mutabili) é fortemente consigliata laggiornamento in modo immutabile
  //     setGameBoard((prevGameBoard) => {
  //       const updatedBoard = [
  //         ...prevGameBoard.map((innerArray) => [...innerArray]),
  //       ];
  //       // con lo spread operator vado a passare gli array interni come valori e non per riferimento
  //       // faccio la stessa cosa per ogni array annidato utilizzando il metodo map sull'array padre
  //       updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //       //eseguo la modifica alla copia dell'array andando a modificare la cella cliccata
  //       return updatedBoard;
  //       //restituisco a setGameBoard l'array agggiornato
  //     });

  //     onSelectSquare();
  //     //ogni volta che un giocatore fa la sua mossa cambio il giocatore attivo
  //   }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {/* passo una funzione anonima che faccia partire onSelectSquare con i giusti parametri */}
                  {/* se il bottone é stato premuto, nell'array la sua cella avrá valore differente da null, basandomi su questo disabilito dinamicamente il bottone */}
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
          {/* per ogni elemento di gameboard (che contiene i 3 array), vado a generare un li con dentro una ol */}
          {/* dentro la ol genero per ogni elemento dell'array figlio un list item con dentro un bottone */}
        </li>
      ))}
    </ol>
  );
}
