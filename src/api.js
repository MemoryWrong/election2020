export const fetchResults = async () => {
  const resp = await fetch(
    'https://raw.githubusercontent.com/alex/nyt-2020-election-scraper/master/results.json'
  );
  const { data } = await resp.json();
  return data;
};
