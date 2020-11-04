import { useState } from 'react';
import useSWR from 'swr';
import { Flex, Text, Heading, Spinner, useDisclosure } from "@chakra-ui/core"

import USAMap from './components/USAMap';
import StateModal from './components/StateModal';
import { fetchCandidates, fetchResults } from './api';
import statesHash from './states_hash.json';

function Center({ children }) {
  return <Flex direction="column" justify="center" align="center" height="100vh">
    {children}
  </Flex>
}

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedState, setSelectedState] = useState({
    name: null,
    electTotal: 0,
    eevp: 0,
    winner: null
  });
  const { data: candidates } = useSWR('candidates', fetchCandidates);
  const { data: results } = useSWR('results', fetchResults, {
    refreshInterval: 60000,
    refreshWhenHidden: true
  });

  const states = {};
  let trumpElectWon = 0;
  let bidenElectWon = 0;

  if (!candidates || !results) {
    return <Center><Spinner color="blue.600" size="xl" /></Center>
  }

  if (candidates && results) {
    Object.keys(results).forEach((state) => {
      const stateResults = results[state][0].summary.results;
      const winner = stateResults.find(i => i.hasOwnProperty('winner'));
  
      if (winner) {
        states[state] = {
          fill: candidates[winner.candidateID].fullName === 'Donald Trump' ? '#C53030' : '#2B6CB0'
        }
      } else {
        const { candidateID } = stateResults.sort((a, b) => b.voteCount - a.voteCount)[0];
        states[state] = {
          fill: candidates[candidateID].fullName === 'Donald Trump' ? '#FED7D7' : '#BEE3F8'
        }
      }
    });

    bidenElectWon = results.US[0].summary.results.find(i => i.candidateID === 'US1036').electWon;
    trumpElectWon = results.US[0].summary.results.find(i => i.candidateID === 'US8639').electWon;
  }

  const onStateClick = (event) => {
    const { summary } = results[event.target.dataset.name][0];

    const winner = summary.results.find(i => i.hasOwnProperty('winner'));
    setSelectedState({
      name: statesHash[event.target.dataset.name],
      electTotal: summary.electTotal,
      eevp: summary.eevp,
      winner: winner ? candidates[winner.candidateID] : null
    })
    onOpen();
  };

  return (
    <Center>
      <Heading as="h2" size="xl" textAlign="center" >2020 Presidential Election</Heading>
      <Heading as="h3" size="lg" mt={2} textAlign="center">
        <Text as="span" color="blue.600">{bidenElectWon}</Text> Biden | Trump <Text as="span" color="red.600">{trumpElectWon}</Text>
      </Heading>
      <USAMap states={states} onStateClick={onStateClick} />
      <StateModal isOpen={isOpen} onClose={onClose} selectedState={selectedState} />
    </Center>
  );
}

export default App;
