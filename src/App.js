import useSWR from 'swr';
import { Flex, Heading } from "@chakra-ui/core"

import USAMap from './USAMap';
import { fetchCandidates, fetchResults } from './api';

function App() {
  const { data: candidates } = useSWR('candidates', fetchCandidates);
  const { data: results } = useSWR('results', fetchResults, {
    refreshInterval: 30000,
    refreshWhenHidden: true
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
    <Flex direction="column" justify="center" align="center" height="100vh">
      <Heading as="h2" size="2xl" mb={5}>2020 Presidential Elections</Heading>
      <USAMap states={states} />
    </Flex>
  );
}

export default App;
