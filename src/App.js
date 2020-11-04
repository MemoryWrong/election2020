import useSWR from 'swr';
import USAMap from './USAMap';
import './App.css';
import { fetchCandidates, fetchResults } from './api';

function App() {
  const { data: candidates } = useSWR('candidates', fetchCandidates);
  const { data: results } = useSWR('results', fetchResults, {
    refreshInterval: 60000
  });

  if (!candidates || !results) return <div>Loading...</div>

  console.log(candidates)
  console.log(results)

  const states = {};

  Object.keys(results).forEach((state) => {
    const stateResults = results[state][0].summary.results;
    const winner = stateResults.find(i => i.hasOwnProperty('winner'));

    if (winner) {
      states[state] = {
        fill: candidates[winner.candidateID].fullName === 'Donald Trump' ? '#C93136' : '#1475B7'
      }
    }
  });

  return (
    <div className="App">
      <USAMap states={states} />
    </div>
  );
}

export default App;
