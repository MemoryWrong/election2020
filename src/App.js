import { useState, Suspense } from 'react';
import ReactTooltip from 'react-tooltip';

import './App.css';
import Title from './components/Title';

import MapChart from './components/MapChart';

const App = () => {
  const [content, setContent] = useState(null);

  return (
    <div className="container">
      <Suspense fallback={<div>Fetching results...</div>}>
        <Suspense fallback={<>Loading...</>}>
          <Title />
        </Suspense>
        <MapChart setTooltipContent={setContent} />
      </Suspense>
      <ReactTooltip className="tooltip" textColor="#000" backgroundColor="#FFF">
        {content && (
          <>
            <p style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
              {content.name}
            </p>
            <p style={{ fontSize: '0.875rem' }}>
              {content.electTotal} electoral votes
            </p>
            <p style={{ fontSize: '0.875rem', fontStyle: 'italic' }}>
              {content.eevp}%{' '}
              {content.winner ? `Expected vote` : `of expected vote in`}
            </p>
            {content.winner && (
              <p
                style={{
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  color: '#2F855A',
                }}
              >
                Winner: {content.winner.fullName}
              </p>
            )}
          </>
        )}
      </ReactTooltip>
    </div>
  );
};

export default App;
