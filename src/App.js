import { useState, Suspense } from 'react';
import ReactTooltip from 'react-tooltip';

import './App.css';
import Title from './components/Title';

import MapChart from './components/MapChart';

const App = () => {
  const [content, setContent] = useState(null);

  return (
    <div className="container">
      <Suspense fallback={<div>Fetching data from NY Times...</div>}>
        <Suspense fallback={<>Loading...</>}>
          <Title />
        </Suspense>
        <MapChart setTooltipContent={setContent} />
      </Suspense>
      <ReactTooltip className="tooltip" textColor="#000" backgroundColor="#FFF">
        {content && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {content.winner && (
              <img
                src={content.imgUrl}
                alt="president_image"
                style={{ width: 80 }}
              />
            )}
            <div style={{ marginLeft: 7 }}>
              <p className="state">{content.name}</p>
              <p className="elect-total">
                {content.electTotal} electoral votes
              </p>
              <p className="eevp">
                {content.eevp}%{' '}
                {content.winner ? `Expected vote` : `of expected vote in`}
              </p>
              {content.winner && (
                <p className="winner-name">Winner: {content.winner}</p>
              )}
            </div>
          </div>
        )}
      </ReactTooltip>
    </div>
  );
};

export default App;
