export type UserRole = "buyer" | "seller" | "admin";

export type User = {
  id: string;
  phone: string;
  name: string;
  region: string;
  role: UserRole;
};

export type CartItem = {
  productId: string;
  productName: string;
  material: string;
  color: string;
  width: number;
  metersPerRoll: number;
  pricePerMeter: number;
  seller: string;
  sellerId: string;
  image: string;
  quantity: number; // rulonlar soni
};

export type OrderStatus =
  | "created"
  | "paid"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderItem = {
  productId: string;
  productName: string;
  material: string;
  quantity: number;
  pricePerMeter: number;
  metersPerRoll: number;
};

export type Order = {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerPhone: string;
  sellerId: string;
  sellerName: string;
  items: OrderItem[];
  subtotal: number;
  deliveryPrice: number;
  total: number;
  status: OrderStatus;
  region: string;
  address: string;
  btsTrackingNo?: string;
  paymentMethod: "payme" | "click";
  createdAt: string;
  updatedAt: string;
  commissionAmount?: number;
};

export const STATUS_LABELS: Record<OrderStatus, string> = {
  created: "Yaratildi",
  paid: "To'langan",
  confirmed: "Tasdiqlandi",
  shipped: "Yo'lda",
  delivered: "Yetkazildi",
  cancelled: "Bekor qilindi",
};

export const STATUS_COLORS: Record<OrderStatus, string> = {
  created: "#6B7280",
  paid: "#2563EB",
  confirmed: "#7C3AED",
  shipped: "#D97706",
  delivered: "#16A34A",
  cancelled: "#DC2626",
};
