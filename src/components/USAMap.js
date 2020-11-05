import ReactUSAMap from "react-usa-map";
import useSWR from 'swr';
import { useBreakpointValue, Box } from "@chakra-ui/core"

import { fetchCandidates, fetchResults } from '../api';
import statesHash from '../states_hash.json';

const USAMap = ({ onStateClick }) => {
    const { data: candidates } = useSWR('candidates', fetchCandidates, { suspense: true });
    const { data: results } = useSWR('results', fetchResults, {
      refreshInterval: 60000,
      refreshWhenHidden: true,
      suspense: true
    });
    const width = useBreakpointValue([200, 350, 500, 600]);
    const states = {};

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

    const handleStateClick = (event) => {
      const { summary } = results[event.target.dataset.name][0];
      const winner = summary.results.find(i => i.hasOwnProperty('winner'));
      onStateClick({
        name: statesHash[event.target.dataset.name],
        electTotal: summary.electTotal,
        eevp: summary.eevp,
        winner: winner ? candidates[winner.candidateID] : null
      });
    }
  
    return (
      <Box mt={5}>
        <ReactUSAMap height={width} customize={states} onClick={(event) => handleStateClick(event)} />
      </Box>
    );
}

export default USAMap;