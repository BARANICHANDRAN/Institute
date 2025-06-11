import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

interface Course {
  id: number;
  name: string;
  instructor: string;
  schedule: string;
  progress: number;
}

interface Attendance {
  present: number;
  absent: number;
  total: number;
  percentage: number;
}

interface Progress {
  completedCourses: number;
  totalCourses: number;
  gpa: number;
}

interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
}

@Injectable({
  providedIn: 'root'
})
export class StudentDashboardService {
  private apiUrl = `${environment.apiUrl}/student`;

  constructor(private http: HttpClient) {}

  getStudentProfile(): Observable<User> {
    // Mock data for now
    return of({
      id: 1,
      username: 'student1',
      email: 'student@example.com',
      firstName: 'John',
      lastName: 'Doe',
      name: 'John Doe',
      role: 'student',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true
    });
  }

  updateStudentProfile(profile: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/profile`, profile);
  }

  getStudentCourses(): Observable<Course[]> {
    // Mock data for now
    return of([
      {
        id: 1,
        name: 'Mathematics',
        instructor: 'Dr. Smith',
        schedule: 'Mon, Wed 10:00 AM',
        progress: 75
      },
      {
        id: 2,
        name: 'Physics',
        instructor: 'Dr. Johnson',
        schedule: 'Tue, Thu 2:00 PM',
        progress: 60
      }
    ]);
  }

  getStudentAttendance(): Observable<Attendance> {
    // Mock data for now
    return of({
      present: 45,
      absent: 5,
      total: 50,
      percentage: 90
    });
  }

  getStudentProgress(): Observable<Progress> {
    // Mock data for now
    return of({
      completedCourses: 3,
      totalCourses: 5,
      gpa: 3.5
    });
  }

  getStudentAssignments(): Observable<Assignment[]> {
    // Mock data for now
    return of([
      {
        id: 1,
        title: 'Math Assignment 1',
        course: 'Mathematics',
        dueDate: '2024-03-20',
        status: 'pending'
      },
      {
        id: 2,
        title: 'Physics Lab Report',
        course: 'Physics',
        dueDate: '2024-03-22',
        status: 'submitted'
      }
    ]);
  }
} 