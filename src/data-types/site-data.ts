import AddressData from "./address-data";
import ContactData from "./contact-data";

export default interface SiteData {
  address: AddressData;
  contact: ContactData;
  id: string;
  images: string[];
  title: string;
}
