import axios from 'axios';
import React from 'react';

interface Match {
  homeTeam: {
    name: string;
  };
  awayTeam: {
    name: string;
  };
  homeScore: number;
  awayScore: number;
  status: string;
}

const useFetchMatches = () => {
  const [matches, setMatches] = React.useState<Match[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchData = async () => {
    try {
      await axios
        .get('https://app.ftoyd.com/fronttemp-service/fronttemp', {
          headers: {
            Accept: 'application/json',
          },
        })
        .then((response) => {
          const matches = response.data?.data?.matches;
          console.log(response.data);
          if (!matches) {
            console.log('No matches found');
            console.log(response);
          }
          setMatches(matches);
        });
    } catch (error) {
      console.warn(error);
      setError('Не удалось загрузить информацию о матчах');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return { matches, loading, error, setLoading, setError, fetchData };
};

export default useFetchMatches;
