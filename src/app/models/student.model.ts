export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  course: string;
  incharge: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  profileImage?: string;
  address?: string;
}

export interface Course {
  id: number;
  name: string;
  description: string;
}

export interface Incharge {
  id: number;
  name: string;
  email: string;
} 