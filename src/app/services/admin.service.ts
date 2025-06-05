import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

export interface DashboardStats {
  totalStudents: number;
  activeCourses: number;
  totalRevenue: number;
  pendingApprovals: number;
  recentActivities: {
    time: string;
    text: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<DashboardStats> {
    // For now, return mock data since we don't have a backend
    return of({
      totalStudents: 1234,
      activeCourses: 45,
      totalRevenue: 123456,
      pendingApprovals: 12,
      recentActivities: [
        {
          time: '10:30 AM',
          text: 'New student registration: John Doe'
        },
        {
          time: '09:45 AM',
          text: 'Course "Web Development" updated'
        },
        {
          time: '09:15 AM',
          text: 'Payment received from Jane Smith'
        }
      ]
    });
  }

  getAdminProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

  updateAdminProfile(profile: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/profile`, profile);
  }

  getSystemLogs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/logs`);
  }

  getActivityReport(startDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/activity-report`, {
      params: { startDate, endDate }
    });
  }
} 