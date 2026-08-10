export type AddressesPayload = {
  addresses: Address[];
};

export type Address = {
  title: string;
  isPrimary: boolean;
  city: string;
  street: string;
  phone: string;
  latitude: number;
  longitude: number;
};
