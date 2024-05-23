export default interface User {
  _id?: string;
  username: string;
  email: string;
  password: string;
  googleId?: string;
  profileImage: string;
  remember?: boolean;
}
export interface UserResponse<T> {
  message?: string;
  data: T;
}
