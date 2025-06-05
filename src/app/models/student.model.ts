export interface Student {
  id?: number;
  name: string;
  email: string;
  phone: string;
  course: string;
  incharge: string;
  createdAt?: Date;
  updatedAt?: Date;
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