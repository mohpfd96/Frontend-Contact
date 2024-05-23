export default interface Contact {
  _id?: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  birthday: Date;
  phoneNumbers: PhoneNumbers[];
  address: string;
  profileImage: string;
  notes: string;
}
interface PhoneNumbers {
  number: string;
  type: string;
}
export interface ContactResponse<T> {
  message?: string;
  data: T;
}
