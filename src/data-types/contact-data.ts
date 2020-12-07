import AddressData from "./address-data";

export default interface ContactData {
  address: AddressData;
  email: string;
  id: string;
  jobTitle: string;
  name: string;
  phoneNumber: string;
}
