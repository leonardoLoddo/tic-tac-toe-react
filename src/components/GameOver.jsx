export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} ha Vinto!</p>}
      {!winner && <p>É un Pareggio!</p>}
      <p>
        <button onClick={onRestart}>Nuova Partita!</button>
        {/* al click faccio scattare la funzione definita in App 'handleRestart' */}
      </p>
    </div>
  );
}
