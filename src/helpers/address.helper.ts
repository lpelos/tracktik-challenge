import AddressData from "../data-types/address-data";

export const formatAddress = ({
  city,
  country,
  state,
  street,
  zipCode,
}: AddressData): string => {
  const firstPart = [street, city, state, country].filter(Boolean).join(", ");
  return [firstPart, zipCode].filter(Boolean).join(" ");
};
