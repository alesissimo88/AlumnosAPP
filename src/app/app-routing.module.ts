import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { AlumnoComponent } from './pages/alumno/alumno.component';


const routes: Routes = [
  { path: 'alumnos', component: AlumnosComponent },
  // Voy a editar el alumno por id
  { path: 'alumno/:id', component: AlumnoComponent },
  // Cualquier otra ruta me va a redireccionar a Alumnos
  { path: '**', pathMatch: 'full', redirectTo: 'alumnos'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
