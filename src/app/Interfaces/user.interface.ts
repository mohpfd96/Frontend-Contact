export default interface User {
  _id?: string;
  username: string;
  email: string;
  password: string;
  googleUser?: boolean;
  profileImage: string;
  remember?: boolean;
}
export interface UserResponse<T> {
  message?: string;
  data: T;
}
