import { useState, Suspense } from 'react';
import ReactTooltip from "react-tooltip";

import './App.css';
import Title from './components/Title';

import MapChart from './components/MapChart';

const Center = ({children}) => {
  return <div className="center-content">{children}</div>
}

const App = () => {
  const [content, setContent] = useState(null);

  return (
    <Center>
      <Suspense fallback={<>Loading...</>}>
        <Suspense fallback={<>Loading...</>}>
          <Title />
        </Suspense>
        <MapChart setTooltipContent={setContent} />
      </Suspense>
      <ReactTooltip>
        { content && <><p style={{ fontWeight: 'bold' }}>{content.name}</p>
        <p>{content.electTotal} electoral votes</p>
        <p>{content.eevp}% {content.winner ? `Expected vote` : `of expected vote in`}</p>
        { content.winner && <p>Winner: {content.winner.fullName}</p> }
        </> }
      </ReactTooltip>
    </Center>
  );
}

export default App;
