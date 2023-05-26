import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  nombre: string = ''; // Agrega un valor inicial a 'nombre'
  apellido: string = ''; // Agrega un valor inicial a 'apellido'
  correo: string = ''; // Agrega un valor inicial a 'correo'

  constructor(private http: HttpClient) {}

  submitForm() {
    const data = {
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo
    };

    this.http.post<any>('http://localhost:3000/datos', data)
      .subscribe(
        response => {
          console.log('Datos guardados correctamente en el servidor');
          // Puedes agregar aquí cualquier lógica adicional después de guardar los datos
        },
        error => {
          console.error('Error al guardar los datos en el servidor:', error);
          // Puedes manejar el error de acuerdo a tus necesidades
        }
      );
  }
}


