import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../services/auth.service';
<<<<<<< HEAD
import { StudentService } from '../services/student.service';
import { Student } from '../models/student.model';
import { AddStudentModalComponent } from '../components/add-student-modal/add-student-modal.component';
=======
<<<<<<< HEAD
import { StudentService } from '../services/student.service';
import { Student } from '../models/student.model';
import { AddStudentModalComponent } from '../components/add-student-modal/add-student-modal.component';
=======
>>>>>>> ec495df6874c4b6ecbd769d4aaf173f241055fbe
>>>>>>> fb9acbc5a4a316a7e7e0c1de70b2d9af38163177

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, AddStudentModalComponent]
=======
<<<<<<< HEAD
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
=======
  imports: [CommonModule]
>>>>>>> fb9acbc5a4a316a7e7e0c1de70b2d9af38163177
})
export class AdminDashboardComponent implements OnInit {
  currentUser: User | null = null;
  showAddStudentModal = false;
  students: Student[] = [];
  errorMessage = '';

  constructor(
    private router: Router,
<<<<<<< HEAD
    private authService: AuthService,
    private studentService: StudentService
=======
    private authService: AuthService
>>>>>>> ec495df6874c4b6ecbd769d4aaf173f241055fbe
>>>>>>> fb9acbc5a4a316a7e7e0c1de70b2d9af38163177
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser || this.currentUser.role !== 'admin') {
      this.router.navigate(['']);
    }
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> fb9acbc5a4a316a7e7e0c1de70b2d9af38163177
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
<<<<<<< HEAD
=======
=======
>>>>>>> ec495df6874c4b6ecbd769d4aaf173f241055fbe
>>>>>>> fb9acbc5a4a316a7e7e0c1de70b2d9af38163177
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
<<<<<<< HEAD
} 
=======
} 
>>>>>>> ec495df6874c4b6ecbd769d4aaf173f241055fbe
