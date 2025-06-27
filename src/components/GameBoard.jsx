export default function GameBoard({ onSelectSquare, board }) {
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
