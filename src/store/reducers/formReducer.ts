import type { FormState } from '../../types/types'
import {
  ADD_SERVICE,
  RESET_FORM,
  SET_EDITING_SERVICE,
  SET_FORM_ERRORS,
  SET_FORM_NAME,
  SET_FORM_PRICE,
  UPDATE_SERVICE,
} from '../actions'

const initialState: FormState = {
  name: '',
  price: '',
  editingId: null,
  errors: {},
}

export function formReducer(
  state = initialState,
  action: { type: string; payload: unknown }
): FormState {
  switch (action.type) {
    case SET_FORM_NAME: {
      const name = action.payload as string
      return {
        ...state,
        name,
        errors: { ...state.errors, name: undefined },
      }
    }

    case SET_FORM_PRICE: {
      const price = action.payload as string
      return {
        ...state,
        price,
        errors: { ...state.errors, price: undefined },
      }
    }

    case SET_FORM_ERRORS: {
      const errors = action.payload as { name?: string; price?: string }
      return {
        ...state,
        errors,
      }
    }

    case RESET_FORM:
      return initialState

    case SET_EDITING_SERVICE: {
      const editingId = action.payload as string | null
      return {
        ...state,
        editingId,
      }
    }

    case ADD_SERVICE:
    case UPDATE_SERVICE:
      return {
        ...state,
        name: '',
        price: '',
        editingId: null,
        errors: {},
      }

    default:
      return state
  }
}
