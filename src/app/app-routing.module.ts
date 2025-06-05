import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard.component';
import { StudentDashboardComponent } from './student/student-dashboard.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
<<<<<<< HEAD
  { path: '', redirectTo: '/login', pathMatch: 'full' as const },
  { path: 'login', component: LoginComponent },
=======
  { path: '', component: LoginComponent },
>>>>>>> fb9acbc5a4a316a7e7e0c1de70b2d9af38163177
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },
  {
    path: 'student',
    component: StudentDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'student' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 