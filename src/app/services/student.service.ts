import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Student, Course, Incharge } from '../models/student.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = `${environment.apiUrl}/students`;

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    // For now, return mock data since we don't have a backend
    return of([
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '+1234567890',
        course: 'Web Development',
        incharge: 'Jane Smith',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phoneNumber: '+1987654321',
        course: 'Data Science',
        incharge: 'Mike Johnson',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true
      }
    ]);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  createStudent(student: Partial<Student>): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  updateStudent(id: number, student: Partial<Student>): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${environment.apiUrl}/courses`);
  }

  getIncharges(): Observable<Incharge[]> {
    return this.http.get<Incharge[]>(`${environment.apiUrl}/incharges`);
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-email/${email}`);
  }

  checkPhoneExists(phone: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-phone/${phone}`);
  }
} 