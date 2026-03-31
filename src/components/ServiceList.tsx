import { useAppSelector, useAppDispatch, useDebounce } from '../store/hooks'
import { selectFilteredServices, selectSearchTerm } from '../store/selectors'
import { deleteService, setEditingService, setFormName, setFormPrice } from '../store/actions'

export const ServiceList = () => {
  const dispatch = useAppDispatch()
  const searchTerm = useAppSelector(selectSearchTerm)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const filteredServices = useAppSelector((state) =>
    selectFilteredServices({ ...state, filter: { ...state.filter, searchTerm: debouncedSearchTerm } })
  )

  const handleEdit = (service: { id: string; name: string; price: number }) => {
    dispatch(setEditingService(service.id))
    dispatch(setFormName(service.name))
    dispatch(setFormPrice(String(service.price)))
  }

  const handleDelete = (id: string) => {
    dispatch(deleteService(id))
  }

  const highlightMatch = (text: string) => {
    if (!searchTerm.trim()) return text

    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index}>{part}</mark>
      ) : (
        part
      )
    )
  }

  if (filteredServices.length === 0) {
    return (
      <div className="service-list-empty">
        {searchTerm ? 'Услуги не найдены' : 'Список услуг пуст'}
      </div>
    )
  }

  return (
    <ul className="service-list">
      {filteredServices.map((service) => (
        <li key={service.id} className="service-item">
          <span className="service-name">{highlightMatch(service.name)}</span>
          <span className="service-price">{service.price.toFixed(2)} ₽</span>
          <div className="service-actions">
            <button
              className="edit-button"
              onClick={() => handleEdit(service)}
            >
              Редактировать
            </button>
            <button
              className="delete-button"
              onClick={() => handleDelete(service.id)}
            >
              Удалить
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
