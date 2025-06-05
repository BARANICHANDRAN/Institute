export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  name?: string;
  role: 'admin' | 'student';
  createdAt: string;
  updatedAt: string;
  profileImage?: string;
  phoneNumber?: string;
  address?: string;
  isActive: boolean;
} 