export function formatPrice(n: number) {
  return n.toLocaleString("uz-UZ") + " so'm";
}

export function genId() {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}

export const REGIONS = [
  "Toshkent shahri",
  "Toshkent viloyati",
  "Samarqand",
  "Buxoro",
  "Farg'ona",
  "Andijon",
  "Namangan",
  "Xorazm",
  "Qashqadaryo",
  "Surxondaryo",
  "Sirdaryo",
  "Jizzax",
  "Navoiy",
  "Qoraqalpog'iston",
];

export const DELIVERY_PRICES: Record<string, number> = {
  "Toshkent shahri": 30000,
  "Toshkent viloyati": 40000,
  Samarqand: 80000,
  Buxoro: 90000,
  "Farg'ona": 85000,
  Andijon: 85000,
  Namangan: 85000,
  Xorazm: 100000,
  Qashqadaryo: 90000,
  Surxondaryo: 95000,
  Sirdaryo: 60000,
  Jizzax: 65000,
  Navoiy: 85000,
  "Qoraqalpog'iston": 110000,
};
