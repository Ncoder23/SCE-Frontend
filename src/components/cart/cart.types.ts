export interface CartItem {
    id: number;
    project_name: string;
    credit_type: 'carbon_credit' | 'REC' | 'plastic_credit';
    price_per_unit: number;
    quantity: number;
  }
  
  export interface CartState {
    items: CartItem[];
    loading: boolean;
    error: string | null;
  }