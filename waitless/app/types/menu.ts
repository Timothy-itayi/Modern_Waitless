export interface MenuItem {
  name: string;
  price: number;
  description: string;
  category: string;
  image_url: string;
  available: boolean;
}

export interface OrderItem extends MenuItem {
  quantity: number;
}

export interface OrderConfirmation {
  orderId?: string;
  totalPrice: number;
  items: OrderItem[];
  timestamp: string;
} 