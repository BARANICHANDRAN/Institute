import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { Course, Incharge } from '../../models/student.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-student-modal',
  templateUrl: './add-student-modal.component.html',
  styleUrls: ['./add-student-modal.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddStudentModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() studentAdded = new EventEmitter<void>();

  studentForm: FormGroup;
  courses: Course[] = [];
  incharges: Incharge[] = [];
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService
  ) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      course: ['', Validators.required],
      incharge: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadCourses();
    this.loadIncharges();
    this.setupEmailValidation();
    this.setupPhoneValidation();
  }

  closeModal() {
    this.close.emit();
  }

  private loadCourses() {
    this.studentService.getCourses().subscribe(
      courses => this.courses = courses,
      error => this.errorMessage = 'Failed to load courses'
    );
  }

  private loadIncharges() {
    this.studentService.getIncharges().subscribe(
      incharges => this.incharges = incharges,
      error => this.errorMessage = 'Failed to load incharges'
    );
  }

  private setupEmailValidation() {
    this.studentForm.get('email')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(email => this.studentService.checkEmailExists(email))
    ).subscribe(exists => {
      if (exists) {
        this.studentForm.get('email')?.setErrors({ emailExists: true });
      }
    });
  }

  private setupPhoneValidation() {
    this.studentForm.get('phone')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(phone => this.studentService.checkPhoneExists(phone))
    ).subscribe(exists => {
      if (exists) {
        this.studentForm.get('phone')?.setErrors({ phoneExists: true });
      }
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      this.isSubmitting = true;
      this.studentService.addStudent(this.studentForm.value).subscribe(
        response => {
          this.isSubmitting = false;
          this.studentForm.reset();
          this.studentAdded.emit();
        },
        error => {
          this.isSubmitting = false;
          this.errorMessage = 'Failed to add student';
        }
      );
    }
  }
} 