import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { StudentService } from '../services/student.service';
import { AdminService, DashboardStats } from '../services/admin.service';
import { Student } from '../models/student.model';
import { AddStudentModalComponent } from '../components/add-student-modal/add-student-modal.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, AddStudentModalComponent]
})
export class AdminDashboardComponent implements OnInit {
  currentUser: User | null = null;
  showAddStudentModal = false;
  students: Student[] = [];
  errorMessage = '';
  dashboardStats: DashboardStats | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private studentService: StudentService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadDashboardStats();
  }

  private loadUserData(): void {
    const user = this.authService.getCurrentUser();
    if (!user || user.role !== 'admin') {
      this.router.navigate(['/login']);
      return;
    }
    this.currentUser = user;
  }

  private loadDashboardStats(): void {
    this.loading = true;
    this.error = null;
    this.adminService.getDashboardStats().subscribe({
      next: (stats) => {
        this.dashboardStats = stats;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load dashboard statistics. Please try again later.';
        this.loading = false;
        console.error('Error loading dashboard stats:', err);
      }
    });
  }

  loadStudents() {
    this.studentService.getStudents().subscribe(
      students => this.students = students,
      error => this.errorMessage = 'Failed to load students'
    );
  }

  openAddStudentModal() {
    this.showAddStudentModal = true;
  }

  closeAddStudentModal() {
    this.showAddStudentModal = false;
  }

  onStudentAdded() {
    this.closeAddStudentModal();
    this.loadDashboardStats();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
