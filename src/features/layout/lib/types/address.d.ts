export type AddressFormInput = z.infer<typeof addressSchema>;

export interface AddressesPayload {
  addresses: Address[];
}

export interface AddressPayload {
  title: string;
  isPrimary: boolean;
  city: string;
  street: string;
  phone: string;
  latitude: number;
  longitude: number;
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
