import live from '../assets/live.svg';
import finish from '../assets/Finished.svg';
import wait from '../assets/Waiting.svg';
import profile from '../assets/profile-img.png';
import dropDown from '../assets/dropDown.svg';
import sad from '../assets/sad.png';
import React from 'react';
import useFetchMatches, { Match } from '../hooks/useFetchMatches';
import { useMatchStore } from '../store/store';
import InfoBoard from './InfoBoard';

interface MainProps {
  loading: boolean;
  error: string | null;
}

const Main: React.FC<MainProps> = ({ loading, error }) => {
  const { matches } = useFetchMatches();
  const [isOpen, setIsOpen] = React.useState<Record<number, boolean>>({});
  const [matchData, setMatchData] = React.useState<Match[]>([]);
  const [isFirstRender, setIsFirstRender] = React.useState(true);
  const { sortByStatus } = useMatchStore();

  React.useEffect(() => {
    if (matches.length > 0) {
      setMatchData(matches);
      setIsFirstRender(false);
    }
  }, [matches]);

  React.useEffect(() => {
    const socket = new WebSocket('wss://app.ftoyd.com/fronttemp-service/ws');

    socket.onopen = () => {
      console.log('connected');
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'update_matches') {
          setMatchData((prevMatches: Match[]) => {
            const updatedMatches: Match[] = data.data || [];
            return prevMatches.map((match) => {
              const updatedMatch = updatedMatches.find((item) => item.id === match.id);
              return updatedMatch ? { ...match, ...updatedMatch } : match;
            }).concat(
              updatedMatches.filter((updatedMatch) => 
                !prevMatches.some((match) => match.id === updatedMatch.id)
              )
            );
          });
       
        }
      } catch (error) {
        console.warn('Error processing WebSocket data:', error);
      }
    };

    socket.onclose = () => {
      console.log('disconnected');
    };

    return () => {
      socket.close();
    };
  }, []);

  const toggleOpen = (index: number) => {
    setIsOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const filteredMatches = isFirstRender || sortByStatus === 'Все статусы'
    ? matchData
    : matchData.filter((match) => match.status === sortByStatus);

  return (
    <main className="flex justify-center w-full w-[1000px] mx-auto max-sm:w-full">
      <ul className="w-full h-auto flex flex-col gap-4 mt-4 pt-8 max-xl:items-center">
        {loading ? (
          <p className="text-white flex justify-around items-center">Загрузка...</p>
        ) : error ? (
          <p className="text-white flex justify-around items-center">{error}</p>
        ) : filteredMatches.length === 0 ? ( // Check if no matches after filtering
          <div className="flex flex- justify-center items-center w-full h-40">
            <img src={sad} alt="Sad smiley" className="w-12 h-12" />
            <p className="text-white text-xl ml-2">Нет матчей для выбранного статуса</p>
          </div>
        ) : (
          filteredMatches.map((match, index) => (
            <li
              key={index}
              style={{ backgroundColor: '#0B0E12' }}
              className="w-full h-auto flex flex-col items-center justify-between rounded-lg px-4 max-sm:w-full "
              >
              <div className="w-full  h-20 flex flex-row items-center justify-between">
              <div className="flex justify-between flex-row items-center w-[54%]">
                <div className="flex flex-row items-center gap-4 max-sm:w-20">
                  <img src={profile} alt="profile-logo" />
                  <h3 className="text-white max-sm:text-sm">{match.homeTeam.name}</h3>
                </div>
                <div className="w-[14%] flex flex-col items-center gap-2 max-md:w-[20%] items-center">
                  <h3 className="text-white max-sm:text-sm whitespace-nowrap">
                    {match.homeScore} : {match.awayScore}
                  </h3>
                  <button className="w-full flex rounded-lg cursor-pointer max-md:w-full items-center max-sm:w-30 items-center justify-around">
                    {match.status === 'Ongoing' ? (
                      <img
                        src={live}
                        className="max-md:w-full max-sm:w-[50%] items-center"
                        alt="Live "
                      />
                    ) : match.status === 'Finished' ? (
                      <img
                        src={finish}
                        className="max-md:w-full max-sm:w-[50%] items-center"
                        alt="finish"
                      />
                    ) : match.status === 'Scheduled' ? (
                      <img src={wait} className="max-md:w-full max-sm:w-[50%] " alt="wait" />
                    ) : (
                      <p className="text-white">Загрузка...</p>
                    )}
                  </button>
                </div>
              </div>
              <div className="flex flex-row items-center gap-4 relative left-30 max-sm:w-25 max-lg:left-20 max-md:left-14 max-sm:left-5">
                <h3 className="text-white">{match.awayTeam.name}</h3>
                <img src={profile} alt="profile-logo" />
              </div>
              <button onClick={() => toggleOpen(index)} className="cursor-pointer max-lg:relative left-3 max-md:flex items-center justify-center right-10">
                <img
                  className={`transform transition-transform duration-300 ${
                    isOpen[index] ? 'rotate-180' : 'rotate-0'
                  }`}
                  src={dropDown}
                  alt="dropDown"
                />
              </button>
              </div>
              {isOpen[index] && (
                <div className="w-full h-28 flex flex-row text-white p-4 mt-2 rounded-lg gap-9 max-md:mb-4 relative bottom-6 max-sm:gap-3 right-3 max-xs:w-full h-auto flex-col">
                    <InfoBoard match={match} />
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </main>
  );
};

export default Main;
