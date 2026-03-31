import { createSelector } from 'reselect'
import type { RootState, Service } from '../types/types'

// Базовые селекторы
export const selectServices = (state: RootState) => state.services.items
export const selectSearchTerm = (state: RootState) => state.filter.searchTerm
export const selectForm = (state: RootState) => state.form

// Селектор для фильтрации услуг
export const selectFilteredServices = createSelector(
  [selectServices, selectSearchTerm],
  (services, searchTerm): Service[] => {
    if (!searchTerm.trim()) {
      return services
    }
    return services.filter((service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }
)

// Селектор для статистики
export const selectFilterStats = createSelector(
  [selectFilteredServices, selectServices],
  (filteredServices, allServices) => ({
    found: filteredServices.length,
    total: allServices.length,
  })
)

// Селектор для редактируемой услуги
export const selectEditingService = createSelector(
  [selectServices, (state: RootState) => state.form.editingId],
  (services, editingId): Service | null => {
    if (!editingId) return null
    return services.find((service) => service.id === editingId) || null
  }
)
