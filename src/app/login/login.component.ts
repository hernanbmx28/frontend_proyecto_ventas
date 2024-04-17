import { Component } from '@angular/core';
import { LoginService } from '../servicios/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: any;
  clave: any;
  error = false;
  usuario: any;

  user= {
    nombre: "",
    apellido: "",
    rol: "",
    username: "",
    clave: "",
    email: ""
  }

  constructor(private $login: LoginService, private router: Router){}
  
  ngOnInit(): void {
    sessionStorage.setItem("id", "");
    sessionStorage.setItem("nombre", "");
    sessionStorage.setItem("username", "");
    sessionStorage.setItem("rol", "");

  }

  consulta(tecla: any){
    if (tecla == 13 || tecla==""){
      this.$login.consultar(this.username, this.clave).subscribe((resultado:any)=>{
        this.usuario = resultado;
        console.log(this.usuario);

        if(this.usuario[0].validar=="valida"){
          sessionStorage.setItem("id", this.usuario[0]['user_id']);
          sessionStorage.setItem("nombre", this.usuario[0]['nombre']);
          sessionStorage.setItem("username", this.usuario[0]['username']);
          sessionStorage.setItem("rol", this.usuario[0]['rol']);
          this.router.navigate(['dashboard']);
        }else{
          console.log("No entro");
          this.error= true;
        }
        
      })
    }
  }

}
