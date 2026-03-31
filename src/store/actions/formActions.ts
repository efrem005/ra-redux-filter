export const SET_FORM_NAME = 'SET_FORM_NAME';
export const SET_FORM_PRICE = 'SET_FORM_PRICE';
export const SET_FORM_ERRORS = 'SET_FORM_ERRORS';
export const RESET_FORM = 'RESET_FORM';

export const setFormName = (name: string) => ({
  type: SET_FORM_NAME,
  payload: name,
});

export const setFormPrice = (price: string) => ({
  type: SET_FORM_PRICE,
  payload: price,
});

export const setFormErrors = (errors: { name?: string; price?: string }) => ({
  type: SET_FORM_ERRORS,
  payload: errors,
});

export const resetForm = () => ({
  type: RESET_FORM,
});
