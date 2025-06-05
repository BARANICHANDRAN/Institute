import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../services/auth.service';
import { StudentService } from '../services/student.service';
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

  constructor(
    private router: Router,
    private authService: AuthService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser || this.currentUser.role !== 'admin') {
      this.router.navigate(['']);
    }
    this.loadStudents();
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
    this.loadStudents();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
} 