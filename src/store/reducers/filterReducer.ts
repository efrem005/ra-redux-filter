import type { FilterState } from '../../types/types'
import { CLEAR_SEARCH, SET_SEARCH_TERM } from '../actions'

const initialState: FilterState = {
  searchTerm: '',
}

export function filterReducer(
  state = initialState,
  action: { type: string; payload: unknown }
): FilterState {
  switch (action.type) {
    case SET_SEARCH_TERM: {
      const searchTerm = action.payload as string
      return {
        ...state,
        searchTerm,
      }
    }

    case CLEAR_SEARCH:
      return {
        ...state,
        searchTerm: '',
      }

    default:
      return state
  }
}
