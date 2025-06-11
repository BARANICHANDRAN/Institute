import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { StudentDashboardService } from '../services/student-dashboard.service';

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
  courses: Course[] = [];
  attendance: Attendance | null = null;
  progress: Progress | null = null;
  assignments: Assignment[] = [];
  errorMessage = '';
  today: Date = new Date();

  constructor(
    private router: Router,
    private authService: AuthService,
    private studentDashboardService: StudentDashboardService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser || this.currentUser.role !== 'student') {
      this.router.navigate(['/login']);
      return;
    }
    this.loadStudentData();
  }

  loadStudentData(): void {
    // Load student profile
    this.studentDashboardService.getStudentProfile().subscribe({
      next: (profile) => {
        this.studentProfile = profile;
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.errorMessage = 'Failed to load profile. Please try again later.';
      }
    });

    // Load courses
    this.studentDashboardService.getStudentCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        this.errorMessage = 'Failed to load courses. Please try again later.';
      }
    });

    // Load attendance
    this.studentDashboardService.getStudentAttendance().subscribe({
      next: (attendance) => {
        this.attendance = attendance;
      },
      error: (error) => {
        console.error('Error loading attendance:', error);
        this.errorMessage = 'Failed to load attendance. Please try again later.';
      }
    });

    // Load progress
    this.studentDashboardService.getStudentProgress().subscribe({
      next: (progress) => {
        this.progress = progress;
      },
      error: (error) => {
        console.error('Error loading progress:', error);
        this.errorMessage = 'Failed to load progress. Please try again later.';
      }
    });

    // Load assignments
    this.studentDashboardService.getStudentAssignments().subscribe({
      next: (assignments) => {
        this.assignments = assignments;
      },
      error: (error) => {
        console.error('Error loading assignments:', error);
        this.errorMessage = 'Failed to load assignments. Please try again later.';
      }
    });
  }

  openCompiler(): void {
    this.router.navigate(['/compiler']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
