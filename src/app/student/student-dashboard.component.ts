import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { StudentDashboardService } from '../services/student-dashboard.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class StudentDashboardComponent implements OnInit {
  currentUser: User | null = null;
  studentProfile: User | null = null;
  courses: any[] = [];
  attendance: any = null;
  progress: any = null;
  assignments: any[] = [];
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private studentDashboardService: StudentDashboardService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser || this.currentUser.role !== 'student') {
      this.router.navigate(['']);
    }
    this.loadStudentData();
  }

  loadStudentData() {
    // Load student profile
    this.studentDashboardService.getStudentProfile().subscribe(
      profile => this.studentProfile = profile,
      error => this.errorMessage = 'Failed to load profile'
    );

    // Load courses
    this.studentDashboardService.getStudentCourses().subscribe(
      courses => this.courses = courses,
      error => this.errorMessage = 'Failed to load courses'
    );

    // Load attendance
    this.studentDashboardService.getStudentAttendance().subscribe(
      attendance => this.attendance = attendance,
      error => this.errorMessage = 'Failed to load attendance'
    );

    // Load progress
    this.studentDashboardService.getStudentProgress().subscribe(
      progress => this.progress = progress,
      error => this.errorMessage = 'Failed to load progress'
    );

    // Load assignments
    this.studentDashboardService.getStudentAssignments().subscribe(
      assignments => this.assignments = assignments,
      error => this.errorMessage = 'Failed to load assignments'
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
