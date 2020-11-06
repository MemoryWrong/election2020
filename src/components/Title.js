import useSWR from 'swr';

import { fetchResults } from '../api';
import { RED, BLUE } from '../constants';

const Header = () => {
  const {
    data: { party_control },
  } = useSWR('nytimes-results', fetchResults, {
    refreshInterval: 60000,
    refreshWhenHidden: true,
    suspense: true,
  });

  const { parties } = party_control.find((i) => i.race_type === 'president');

  return (
    <h2 className="title">
      <span style={{ color: BLUE }}>{parties.democrat.count}</span> Biden |
      Trump <span style={{ color: RED }}>{parties.republican.count}</span>
    </h2>
  );
};

export default Header;
