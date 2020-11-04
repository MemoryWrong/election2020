import useSWR from 'swr';
import { Flex, Heading, Spinner } from "@chakra-ui/core"

import USAMap from './USAMap';
import { fetchCandidates, fetchResults } from './api';

function App() {
  const { data: candidates } = useSWR('candidates', fetchCandidates);
  const { data: results } = useSWR('results', fetchResults, {
    refreshInterval: 30000,
    refreshWhenHidden: true
  });

  // if (!candidates || !results) {
  //   return 
  // }

  console.log(candidates)
  console.log(results)

  const states = {};

  if (candidates && results) {
    Object.keys(results).forEach((state) => {
      const stateResults = results[state][0].summary.results;
      const winner = stateResults.find(i => i.hasOwnProperty('winner'));
  
      if (winner) {
        states[state] = {
          fill: candidates[winner.candidateID].fullName === 'Donald Trump' ? '#C93136' : '#1475B7'
        }
      }
    });
  }

  return (
    <Flex direction="column" justify="center" align="center" height="100vh">
      { !candidates || !results ? <Spinner size="xl" /> : <>
        <Heading as="h2" size="xl" mb={5}>2020 Presidential Election</Heading>
        <USAMap states={states} />
      </> }
    </Flex>
  );
}

export default App;
