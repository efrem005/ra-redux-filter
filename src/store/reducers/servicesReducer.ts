import type { ServicesState } from '../../types/types'
import {
  ADD_SERVICE,
  DELETE_SERVICE,
  UPDATE_SERVICE
} from '../actions'

const initialState: ServicesState = {
  items: [
    { id: '1', name: 'Стрижка', price: 500 },
    { id: '2', name: 'Маникюр', price: 800 },
    { id: '3', name: 'Педикюр', price: 900 },
    { id: '4', name: 'Окрашивание', price: 2500 },
    { id: '5', name: 'Укладка', price: 600 },
  ],
}

export function servicesReducer(
  state = initialState,
  action: { type: string; payload: unknown }
): ServicesState {
  switch (action.type) {
    case ADD_SERVICE: {
      const service = action.payload as { id: string; name: string; price: number }
      return {
        ...state,
        items: [...state.items, service],
      }
    }

    case UPDATE_SERVICE: {
      const service = action.payload as { id: string; name: string; price: number }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === service.id ? service : item
        ),
      }
    }

    case DELETE_SERVICE: {
      const id = action.payload as string
      return {
        ...state,
        items: state.items.filter((item: { id: string; name: string; price: number }) => item.id !== id),
      }
    }

    default:
      return state
  }
}
