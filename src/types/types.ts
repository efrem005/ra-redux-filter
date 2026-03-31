export interface Service {
  id: string;
  name: string;
  price: number;
}

export interface ServicesState {
  items: Service[];
}

export interface FilterState {
  searchTerm: string;
}

export interface FormState {
  name: string;
  price: string;
  editingId: string | null;
  errors: {
    name?: string;
    price?: string;
  };
}

export interface RootState {
  services: ServicesState;
  filter: FilterState;
  form: FormState;
}
