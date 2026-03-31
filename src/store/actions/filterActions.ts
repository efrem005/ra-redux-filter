export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';

export const setSearchTerm = (searchTerm: string) => ({
  type: SET_SEARCH_TERM,
  payload: searchTerm,
});

export const clearSearch = () => ({
  type: CLEAR_SEARCH,
});
