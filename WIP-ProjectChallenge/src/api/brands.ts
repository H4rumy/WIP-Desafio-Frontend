import { getBrandsByCustomer as getBrandsMock } from "@/mocks/brands";

export function getBrandsByCustomer(customerId: string) {
  return getBrandsMock(customerId);
}
