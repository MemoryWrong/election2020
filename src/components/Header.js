import useSWR from 'swr';
import { Text, Heading } from "@chakra-ui/core"

import { fetchResults } from '../api';

const Header = () => {
    const { data: results } = useSWR('results', fetchResults, {
      refreshInterval: 60000,
      refreshWhenHidden: true,
      suspense: true
    });

    const bidenElectWon = results.US[0].summary.results.find(i => i.candidateID === 'US1036').electWon;
    const trumpElectWon = results.US[0].summary.results.find(i => i.candidateID === 'US8639').electWon;

    return (
        <>
            <Heading as="h2" size="xl" textAlign="center">2020 Presidential Election</Heading>
            <Heading as="h3" size="lg" mt={2} textAlign="center">
                <Text as="span" color="blue.600">{bidenElectWon}</Text> Biden | Trump <Text as="span" color="red.600">{trumpElectWon}</Text>
            </Heading>
        </>
    )
}

export default Header;