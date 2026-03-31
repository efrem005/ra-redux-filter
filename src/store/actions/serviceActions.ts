import type { Service } from '../../types/types'

export const ADD_SERVICE = 'ADD_SERVICE'
export const UPDATE_SERVICE = 'UPDATE_SERVICE'
export const DELETE_SERVICE = 'DELETE_SERVICE'
export const SET_EDITING_SERVICE = 'SET_EDITING_SERVICE'

export const addService = (service: Service) => ({
  type: ADD_SERVICE,
  payload: service,
})

export const updateService = (service: Service) => ({
  type: UPDATE_SERVICE,
  payload: service,
})

export const deleteService = (id: string) => ({
  type: DELETE_SERVICE,
  payload: id,
})

export const setEditingService = (id: string | null) => ({
  type: SET_EDITING_SERVICE,
  payload: id,
})
