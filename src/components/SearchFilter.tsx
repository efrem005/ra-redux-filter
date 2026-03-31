import { useRef, type ChangeEvent } from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { setSearchTerm, clearSearch } from '../store/actions/filterActions'
import { selectSearchTerm } from '../store/selectors'

export const SearchFilter = () => {
  const dispatch = useAppDispatch()
  const searchTerm = useAppSelector(selectSearchTerm)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value))
  }

  const handleClear = () => {
    dispatch(clearSearch())
    inputRef.current?.focus()
  }

  return (
    <div className="search-filter">
      <input
        ref={inputRef}
        type="text"
        className="search-input"
        placeholder="Поиск услуг..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {searchTerm && (
        <button className="clear-button" onClick={handleClear} type="button">
          ✕
        </button>
      )}
    </div>
  )
}
