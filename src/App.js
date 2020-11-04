import useSWR from 'swr';
import { Flex, Text, Heading, Spinner } from "@chakra-ui/core"

import USAMap from './USAMap';
import { fetchCandidates, fetchResults } from './api';

function Center({ children }) {
  return <Flex direction="column" justify="center" align="center" height="100vh">
  {children}
</Flex>
}

function App() {
  const { data: candidates } = useSWR('candidates', fetchCandidates);
  const { data: results } = useSWR('results', fetchResults, {
    refreshInterval: 60000,
    refreshWhenHidden: true
  });

  console.log(candidates)
  console.log(results)

  const states = {};
  let trumpElectWon = 0;
  let bidenElectWon = 0;

  if (!candidates || !results) {
    return <Center><Spinner size="xl" /></Center>
  }

  if (candidates && results) {
    Object.keys(results).forEach((state) => {
      const stateResults = results[state][0].summary.results;
      const winner = stateResults.find(i => i.hasOwnProperty('winner'));
  
      if (winner) {
        states[state] = {
          fill: candidates[winner.candidateID].fullName === 'Donald Trump' ? '#C53030' : '#2B6CB0'
        }
      }
    });

    bidenElectWon = results.US[0].summary.results.find(i => i.candidateID === 'US1036').electWon;
    trumpElectWon = results.US[0].summary.results.find(i => i.candidateID === 'US8639').electWon;
  }

  return (
    <Center>
      <Heading as="h2" size="xl" textAlign="center" >2020 Presidential Election</Heading>
      <Heading as="h3" size="lg" mt={2} textAlign="center">
        <Text as="span" color="blue.600">{bidenElectWon}</Text> Biden | Trump <Text as="span" color="red.600">{trumpElectWon}</Text>
      </Heading>
      <USAMap states={states} />
    </Center>
  );
}

export default App;
