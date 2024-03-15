function Statistics(props) {
  const good = props.good;
  const neutral = props.neutral;
  const bad = props.bad;
  const toDisplay = good != 0 || neutral != 0 || bad != 0;

  if (!toDisplay) {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given.</p>
      </>
    );
  }

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>Good </th>
            <td>{good}</td>
          </tr>
          <tr>
            <th>Neutral </th>
            <td>{neutral}</td>
          </tr>
          <tr>
            <th>Bad </th>
            <td>{bad}</td>
          </tr>
          <tr>
            <th>All </th>
            <td>{good+neutral+bad}</td>
          </tr>
          <tr>
            <th>Average </th>
            <td>{(good-bad)/(good+neutral+bad)}</td>
          </tr>
          <tr>
            <th>Positive </th>
            <td>{(good)/(good+neutral+bad)*100}%</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Statistics;
