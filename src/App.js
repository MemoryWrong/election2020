import { useState, Suspense } from 'react';
import { Flex, Spinner, useDisclosure } from "@chakra-ui/core"

import USAMap from './components/USAMap';
import StateModal from './components/StateModal';
import Header from './components/Header';

const Center = ({ children }) => {
  return <Flex direction="column" justify="center" align="center" height="100vh">
    {children}
  </Flex>
}

const LoadingIndicator = () => {
  return <Center>
    <Spinner color="blue.600" size="xl" />
  </Center>;
}

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedState, setSelectedState] = useState({
    name: null,
    electTotal: 0,
    eevp: 0,
    winner: null
  });

  const onStateClick = (data) => {
    setSelectedState(data)
    onOpen();
  };

  return (
    <Center>
      <Suspense fallback={<LoadingIndicator />}>
        <Suspense fallback={<>Loading...</>}>
          <Header />
        </Suspense>
        <USAMap onStateClick={onStateClick} />
      </Suspense>
      <StateModal isOpen={isOpen} onClose={onClose} selectedState={selectedState} />
    </Center>
  );
}

export default App;
