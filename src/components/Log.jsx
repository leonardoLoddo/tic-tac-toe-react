export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} ha toccato {turn.square.row} : {turn.square.col}
          {console.log("ciao")}
        </li>
      ))}
    </ol>
  );
}
