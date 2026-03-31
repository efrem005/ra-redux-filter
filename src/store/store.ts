import { legacy_createStore as createStore, combineReducers } from 'redux';
import { servicesReducer } from './reducers/servicesReducer';
import { filterReducer } from './reducers/filterReducer';
import { formReducer } from './reducers/formReducer';

const rootReducer = combineReducers({
  services: servicesReducer,
  filter: filterReducer,
  form: formReducer,
});

export const store = createStore(rootReducer);
