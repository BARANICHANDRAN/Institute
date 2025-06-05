import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Student, Course, Incharge } from '../../models/student.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-student-modal',
  templateUrl: './add-student-modal.component.html',
  styleUrls: ['./add-student-modal.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class AddStudentModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() studentAdded = new EventEmitter<void>();

  studentForm: FormGroup;
  courses: Course[] = [];
  incharges: Incharge[] = [];
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
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

  onSubmit(): void {
    if (this.studentForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.studentService.createStudent(this.studentForm.value).subscribe({
        next: (response: Student) => {
          this.isLoading = false;
          this.studentAdded.emit();
          this.close.emit();
        },
        error: (error: any) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Failed to add student';
        }
      });
    }
  }

  closeModal(): void {
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
    this.studentForm.get('phoneNumber')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(phone => this.studentService.checkPhoneExists(phone))
    ).subscribe(exists => {
      if (exists) {
        this.studentForm.get('phoneNumber')?.setErrors({ phoneExists: true });
      }
    });
  }
} 