import './App.css'
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar'
import UserTable from './components/UserTable'
import { useUserDirectory } from './hooks/useUserDirectory';

function App() {

  const {
    users,
    loading,
    error,
    setQuery,
    page,
    setPage,
    totalPages,
  } = useUserDirectory(5);
  const handleSearch = (value: string) => { setQuery(value) }

  return (
    <div className='flex flex-col'>

      <SearchBar onSearch={handleSearch} />
      {error ?
        <div>
          Error: {error}
        </div> :
        <UserTable list={users || []} loading={loading} />
      }
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  )
}

export default App
