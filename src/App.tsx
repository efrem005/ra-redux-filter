import { SearchFilter } from './components/SearchFilter'
import { FilterStats } from './components/FilterStats'
import { ServiceList } from './components/ServiceList'
import { ServiceForm } from './components/ServiceForm'


function App() {
  return (
    <div className="app">
      <h1>Управление услугами</h1>
      <ServiceForm />
      <SearchFilter />
      <FilterStats />
      <ServiceList />
    </div>
  )
}

export default App
