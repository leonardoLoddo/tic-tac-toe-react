export default function GameOver({ winner }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} ha Vinto!</p>}
      {!winner && <p>É un Pareggio!</p>}
    </div>
  );
}
