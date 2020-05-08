import { Component, OnInit } from '@angular/core';
import { AlumnoModel } from 'src/app/models/alumno.model';
import { ClassGetter, ClassStmt } from '@angular/compiler/src/output/output_ast';
import { NgForm } from '@angular/forms';
import { AlumnosService } from 'src/app/services/alumnos.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  alumno: AlumnoModel = new AlumnoModel();

  constructor( private alumnosService: AlumnosService, private route: ActivatedRoute ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ){

      this.alumnosService.getAlumno( id )
        .subscribe( (resp: AlumnoModel ) => {
          this.alumno = resp;
          this.alumno.id = id;
        });

    }

  }

  guardar( form: NgForm ){

    if ( form.invalid ){
      console.log( 'Formulario no válido' );
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      allowOutsideClick: false,
      icon: 'info'

    });


    Swal.showLoading();
    let peticion: Observable <any>;

    if ( this.alumno.id ){
      peticion = this.alumnosService.actualizarAlumno( this.alumno );
    } else {
      peticion = this.alumnosService.crearAlumno( this.alumno );
    }

    peticion.subscribe( resp => {
      Swal.fire({
        title: this.alumno.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });

    });

  }

}
