import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class StudentDashboardService {
  private apiUrl = `${environment.apiUrl}/student`;

  constructor(private http: HttpClient) {}

  getStudentProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

  updateStudentProfile(profile: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/profile`, profile);
  }

  getStudentCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/courses`);
  }

  getStudentAttendance(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/attendance`);
  }

  getStudentProgress(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/progress`);
  }

  getStudentAssignments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/assignments`);
  }
} 