export type Product = {
  id: string;
  name: string;
  material: string;
  color: string;
  colorHex: string;
  width: number;
  metersPerRoll: number;
  pricePerMeter: number;
  stockRolls: number;
  seller: string;
  sellerId: string;
  sellerCity: string;
  images: string[];
  description: string;
};

export const MATERIALS = ["Hammasi", "Atlas", "Chit", "Ip gazlama", "Shoyi", "Kashmir", "Jun", "Krep"];
export const COLORS = ["Hammasi", "Oq", "Qora", "Qizil", "Ko'k", "Yashil", "Sariq", "Pushti", "Kulrang"];
export const WIDTHS = [90, 110, 140, 150];

// Demo seller IDs match auth-page demo users
const SELLER_TOSHKENT = "SELLER_TSH";
const SELLER_SILKROAD = "SELLER_SMQ";
const SELLER_FARGONA = "SELLER_FRG";
const SELLER_ANDIJON = "SELLER_AND";
const SELLER_PREMIUM = "SELLER_PRE";

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Atlas",
    material: "Atlas",
    color: "Oq",
    colorHex: "#F5F5F0",
    width: 150,
    metersPerRoll: 50,
    pricePerMeter: 28000,
    stockRolls: 12,
    seller: "Toshkent Mato",
    sellerId: SELLER_TOSHKENT,
    sellerCity: "Toshkent",
    images: ["https://placehold.co/600x750/e8e2db/6B1020?text=Atlas+Oq"],
    description: "Yuqori sifatli atlas mato. Ko'ylak va libos uchun ideal.",
  },
  {
    id: "2",
    name: "Qora Shoyi",
    material: "Shoyi",
    color: "Qora",
    colorHex: "#1a1a1a",
    width: 140,
    metersPerRoll: 40,
    pricePerMeter: 65000,
    stockRolls: 5,
    seller: "Silk Road",
    sellerId: SELLER_SILKROAD,
    sellerCity: "Samarqand",
    images: ["https://placehold.co/600x750/1a1a1a/F8F5F1?text=Shoyi+Qora"],
    description: "Natural shoyi, Samarqand ishlab chiqarishi. Premium sifat.",
  },
  {
    id: "3",
    name: "Ko'k Chit",
    material: "Chit",
    color: "Ko'k",
    colorHex: "#2563EB",
    width: 110,
    metersPerRoll: 60,
    pricePerMeter: 12000,
    stockRolls: 30,
    seller: "Farg'ona Tekstil",
    sellerId: SELLER_FARGONA,
    sellerCity: "Farg'ona",
    images: ["https://placehold.co/600x750/2563EB/ffffff?text=Chit+Ko%27k"],
    description: "Klassik ko'k chit. Kundalik kiyim uchun.",
  },
  {
    id: "4",
    name: "Qizil Ip Gazlama",
    material: "Ip gazlama",
    color: "Qizil",
    colorHex: "#DC2626",
    width: 150,
    metersPerRoll: 45,
    pricePerMeter: 18000,
    stockRolls: 18,
    seller: "Toshkent Mato",
    sellerId: SELLER_TOSHKENT,
    sellerCity: "Toshkent",
    images: ["https://placehold.co/600x750/DC2626/ffffff?text=Ip+Gazlama"],
    description: "Yumshoq ip gazlama. Sport va casual kiyim uchun.",
  },
  {
    id: "5",
    name: "Kashmir Jun",
    material: "Kashmir",
    color: "Kulrang",
    colorHex: "#6B7280",
    width: 140,
    metersPerRoll: 30,
    pricePerMeter: 95000,
    stockRolls: 3,
    seller: "Premium Tekstil",
    sellerId: SELLER_PREMIUM,
    sellerCity: "Toshkent",
    images: ["https://placehold.co/600x750/6B7280/ffffff?text=Kashmir"],
    description: "Original kashmir jun. Qish mavsumi uchun ideal.",
  },
  {
    id: "6",
    name: "Yashil Krep",
    material: "Krep",
    color: "Yashil",
    colorHex: "#16A34A",
    width: 150,
    metersPerRoll: 50,
    pricePerMeter: 22000,
    stockRolls: 8,
    seller: "Andijon Tekstil",
    sellerId: SELLER_ANDIJON,
    sellerCity: "Andijon",
    images: ["https://placehold.co/600x750/16A34A/ffffff?text=Krep+Yashil"],
    description: "Engil krep mato. Ko'ylak va palto uchun.",
  },
  {
    id: "7",
    name: "Oq Chit Premium",
    material: "Chit",
    color: "Oq",
    colorHex: "#F9FAFB",
    width: 90,
    metersPerRoll: 80,
    pricePerMeter: 9500,
    stockRolls: 45,
    seller: "Farg'ona Tekstil",
    sellerId: SELLER_FARGONA,
    sellerCity: "Farg'ona",
    images: ["https://placehold.co/600x750/F0EDE8/6B1020?text=Chit+Oq"],
    description: "Oddiy oq chit. Ko'p maqsadlarda ishlatiladi.",
  },
  {
    id: "8",
    name: "Sariq Atlas",
    material: "Atlas",
    color: "Sariq",
    colorHex: "#EAB308",
    width: 150,
    metersPerRoll: 40,
    pricePerMeter: 31000,
    stockRolls: 7,
    seller: "Silk Road",
    sellerId: SELLER_SILKROAD,
    sellerCity: "Samarqand",
    images: ["https://placehold.co/600x750/EAB308/1a1a1a?text=Atlas+Sariq"],
    description: "Yorqin sariq atlas. Bayram kiyimlari uchun.",
  },
  {
    id: "9",
    name: "Pushti Shoyi",
    material: "Shoyi",
    color: "Pushti",
    colorHex: "#EC4899",
    width: 140,
    metersPerRoll: 35,
    pricePerMeter: 58000,
    stockRolls: 6,
    seller: "Premium Tekstil",
    sellerId: SELLER_PREMIUM,
    sellerCity: "Toshkent",
    images: ["https://placehold.co/600x750/EC4899/ffffff?text=Shoyi+Pushti"],
    description: "Nozik pushti shoyi. Kecha kiyimlari uchun ideal.",
  },
];
