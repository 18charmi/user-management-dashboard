import { getUsers } from './api/userApi';
import './App.css'
import SearchBar from './components/SearchBar'
import UserTable from './components/UserTable'
import { useAxios } from './hooks/useAxios';
import type { User } from './types';

function App() {

  const { data: users, loading, error } = useAxios<User[]>(getUsers);

  const handleSearch = (value: string) => { }

  return (
    <div className='flex flex-col'>

      <SearchBar onSearch={handleSearch} />
      {
        // TODO: replace with linear loader
        loading && <div>Loading users…</div>
      }
      {error &&
        <div>
          Error: {error}
        </div>
      }
      <UserTable list={users || []} />

    </div>
  )
}

export default App
