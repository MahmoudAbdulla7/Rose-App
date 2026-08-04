export interface AddressesPayload {
  addresses: Address[];
}

export interface AddressPayload {
  address: Address;
}

export interface Address {
  id: string;
  userId: string;
  title: string;
  isPrimary: boolean;
  city: string;
  street: string;
  phone: string;
  latitude: string;
  longitude: string;
  createdAt: string;
  updatedAt: string;
}
