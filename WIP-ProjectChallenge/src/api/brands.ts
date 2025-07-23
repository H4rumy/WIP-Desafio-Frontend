import { getBrandsByCustomer as getBrandsMock } from "@/mocks/mock/brands";

export function getBrandsByCustomer(customerId: string) {
  return getBrandsMock(customerId);
}
