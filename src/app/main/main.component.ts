import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  nombre: any;
  rol: any;

  constructor(private router:Router){}

  ngOnInit(): void {
    this.nombre = sessionStorage.getItem("nombre");
    this.rol = sessionStorage.getItem("rol");
  }

  cerrar(){
    sessionStorage.setItem("id", "");
    sessionStorage.setItem("nombre", "");
    sessionStorage.setItem("username", "");
    sessionStorage.setItem("rol", "");
    this.router.navigate(['login']);

  }

}




