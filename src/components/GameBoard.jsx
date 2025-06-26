import { useState } from "react";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
//questo array rappresenta la tabella da gioco
export default function GameBoard() {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  function handleSelectSquare(rowIndex, colIndex) {
    //se lo state contine un oggetto o array (mutabili) é fortemente consigliata laggiornamento in modo immutabile
    setGameBoard((prevGameBoard) => {
      const updatedBoard = [
        ...prevGameBoard.map((innerArray) => [...innerArray]),
      ];
      // con lo spread operator vado a passare gli array interni come valori e non per riferimento
      // faccio la stessa cosa per ogni array annidato utilizzando il metodo map sull'array padre
      updatedBoard[rowIndex][colIndex] = "X";
      //eseguo la modifica alla copia dell'array andando a modificare la cella cliccata
      return updatedBoard;
      //restituisco a setGameBoard l'array agggiornato
    });
  }
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>
                  {/* passo una funzione anonima che faccia partire handleSelectSquare con i giusti parametri */}
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
