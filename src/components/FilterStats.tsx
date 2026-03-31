import { useAppSelector, useDebounce } from '../store/hooks'
import { selectFilterStats, selectSearchTerm } from '../store/selectors'

export const FilterStats = () => {
  const searchTerm = useAppSelector(selectSearchTerm)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const { found, total } = useAppSelector((state) =>
    selectFilterStats({ ...state, filter: { ...state.filter, searchTerm: debouncedSearchTerm } })
  )

  return (
    <div className="filter-stats">
      Найдено: {found} из {total} услуг
    </div>
  )
}
