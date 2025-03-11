import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import useFetchMatches from './hooks/useFetchMatches';



function App() {
  const { loading, setLoading, error, setError } = useFetchMatches();

  return (
    <>
    <Header loading={loading} setLoading={setLoading} error={error} setError={setError} />
      <Main loading={loading}  error={error} />
    </>
  );
}

export default App;
