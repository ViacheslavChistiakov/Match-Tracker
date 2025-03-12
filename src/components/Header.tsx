import useFetchMatches from '../hooks/useFetchMatches';
import refreash from '../assets/Refresh.svg';
import title from '../assets/logo.svg';
import triangle from '../assets/triangle.svg';
import { useMatchStore } from '../store/store';

interface HeaderProps {
  error: string | null;
  loading: boolean;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ error, loading, setLoading, setError }) => {

 const { fetchData } = useFetchMatches();
 const { sortByStatus, setSortByStatus } = useMatchStore();

  const clickUpdate = async () => {
    setLoading(true);
    try {
      await fetchData();
    } catch (error) {
      console.warn(error);
      setError('Не удалось загрузить информацию о матчах');
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="flex justify-between w-full w-[1200px] mx-auto max-sm:w-full items-center py-4 max-lg:flex-col gap-4 items-center">
      <img src={title} alt="title" className="max-sm:w-35" />
      <select
        style={{ backgroundColor: '#0B0E12' }}
        className="w-36 h-10 flex items-center justify-center text-gray-400 rounded-lg cursor-pointer  max-md:w-full"
        value={sortByStatus}
        onChange={(e) => setSortByStatus(e.target.value)}
        >
        <option className="w-full" value="Все статусы">Все статусы</option>
        <option className="w-full" value="Ongoing">Live</option>
        <option  className="w-full"value="Finished">Finished</option>
        <option className="w-full" value="Scheduled">Scheduled</option>
      </select>
      <div className="w-[41%] flex flex-row justify-between max-xl:flex-col-reverse max-lg:w-full items-center gap-4">
        {error ? (
          <div className="w-60 h-11  flex flex-row items-center max-xl-w-full">
            <img src={triangle} alt="triangle" className="w-6 h-6 pr-2" />
            <h3 className="text-white text-xs whitespace-nowrap max-xl:pl-2">
              Ошибка: не удалось загрузить информацию
            </h3>
          </div>
        ) : (
          <div className="w-60 h-11  flex flex-row items-center max-xl-w-full max-xl:hidden">
            <h3 className="text-white text-mg whitespace-nowrap max-xl:pl-2">Список матчей</h3>
          </div>
        )}
        <button
          style={
            loading
              ? { backgroundColor: '#701328' }
              : error
              ? { backgroundColor: '#A01131' }
              : { backgroundColor: '#EB0237' }
          }
          onClick={clickUpdate}
          className="w-40 h-11  flex flex-row items-center  justify-center gap-2 text-white bg-red-600 rounded-lg cursor-pointer max-md:w-full">
          Обновить
          <img src={refreash} alt="refreash" className="w-6 h-6 pl-2" />
        </button>
      </div>
    </header>
  );
};

export default Header;
