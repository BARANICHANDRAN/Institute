import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard.component';
import { StudentDashboardComponent } from './student/student-dashboard.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { 
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: AdminDashboardComponent },
      { path: 'students', component: AdminDashboardComponent },
      { path: 'courses', component: AdminDashboardComponent },
      { path: 'reports', component: AdminDashboardComponent },
      { path: 'settings', component: AdminDashboardComponent }
    ]
  },
  {
    path: 'student',
    component: StudentDashboardComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: StudentDashboardComponent },
      { path: 'courses', component: StudentDashboardComponent },
      { path: 'assignments', component: StudentDashboardComponent },
      { path: 'grades', component: StudentDashboardComponent },
      { path: 'profile', component: StudentDashboardComponent }
    ]
  }
];
