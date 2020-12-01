export interface Identify {
  name: string;
  phone: string;
}

export interface Payment {
  change: number;
  paymentMethod: string;
}

export interface OrderItemQuestion {
  details: string;
  group: string;
  is_active: boolean;
  qtd: number;
  printDescription: string;
}

export interface OrderItem {
  id: string;
  note: string;
  price: number;
  productDescription: string;
  qtd: number;
  rules: any[];
  groups: OrderItemQuestion[][];
}

export interface OrderAddress {
  publicPlace: string;
  number: string;
  neighborhood: string;
}

export interface Event {
  at: Date;
  event: string;
}

export interface Order {
  itens: OrderItem[];
  note: string;
  identify: Identify;
  total: number;
  discountValue: number;
  totalProducts: number;
  store: any;
  payment?: Payment;
  address?: OrderAddress;
  deliveryFee?: number;
  freeTaxMinOrderValue?: number;
  _id: string;
  createdAt: Date;
  events: Event[];
}
