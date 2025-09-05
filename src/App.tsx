
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
    searching,
    setSearching
  } = useUserDirectory(5);

  const handleSearch = (value: string) => { setQuery(value) }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-6">
        <SearchBar onSearch={handleSearch} setSearching={setSearching}/>
        {error ?
          <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded-md">
            Error: {error}
          </div> : <UserTable list={users || []} loading={loading || searching} />
        }
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />

      </div>
    </div>


  )
}

export default App
