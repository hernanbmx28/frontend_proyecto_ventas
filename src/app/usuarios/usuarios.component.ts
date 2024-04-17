import { Component } from '@angular/core';
import { UsuariosService } from '../servicios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  
  usuarios: any;
  user_id:any;

  obj_usuario = {
    nombre: "",
    apellido: "",
    rol: "",
    username: "",
    clave: "",
    email: "",
  }

  validar_nombre=true;
  validar_apellido=true;
  validar_rol=true;
  validar_username=true;
  validar_clave=true;
  validar_email=true;
  mform=false;

  botones_form = false;

  constructor(private $usuarios:UsuariosService){}

  ngOnInit(): void{
    this.consulta();
  }

  consulta(){
    this.$usuarios.consultar().subscribe((resultado:any) => {
      this.usuarios = resultado;
    })
  }

  
  mostrar_form(dato: any){
    switch(dato){
      case "ver":
        this.mform= true;
      break;
      case "no ver":
        this.mform= false;
        this.botones_form = false;
      break;
    }
  }

  limpiar(){
    this.obj_usuario = {
      nombre: "",
      apellido: "",
      rol: "",
      username: "",
      clave: "",
      email: "",
    }
  }


  validar(funcion: any){
    if(this.obj_usuario.nombre == ""){
      this.validar_nombre=false;
    }else{
      this.validar_nombre=true;
    }

    if(this.obj_usuario.apellido == ""){
      this.validar_apellido=false;
    }else{
      this.validar_apellido=true;
    }

    if(this.obj_usuario.rol == ""){
      this.validar_rol=false;
    }else{
      this.validar_rol=true;
    }

    if(this.obj_usuario.username == ""){
      this.validar_username=false;
    }else{
      this.validar_username=true;
    }

    if(this.obj_usuario.clave == ""){
      this.validar_clave=false;
    }else{
      this.validar_clave=true;
    }

    if(this.obj_usuario.email == ""){
      this.validar_email=false;
    }else{
      this.validar_email=true;
    }

    if(this.validar_nombre==true && this.validar_apellido==true && this.validar_rol==true && this.validar_username==true && this.validar_clave==true&& this.validar_email==true &&
      funcion== 'guardar'){
      this.guardar();
    }

    if(this.validar_nombre==true && this.validar_apellido==true && this.validar_rol==true && this.validar_username==true && this.validar_clave==true&& this.validar_email==true &&
      funcion== 'editar'){
      this.editar();
    }
  }

  guardar(){
    this.$usuarios.insertar(this.obj_usuario).subscribe((datos:any) => {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');

  }

  eliminar(id:number){

    Swal.fire({
      title: "Desea eliminar el Usuario?",
      text: "El proceso no podra ser revertido!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        
        ////////////
        this.$usuarios.eliminar(id).subscribe((datos:any) => {
          if(datos ['resultado']=='OK'){
            this.consulta(); 
           }
        })
        ///////////

        Swal.fire({
          title: "Uusario Eliminado !",
          text: "El Usuario ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }


  cargar_datos(items: any, id:number){

    this.obj_usuario = {
      nombre: items.nombre,
      apellido: items.apellido,
      rol: items.rol,
      username: items.username,
      clave: items.clave,
      email: items.email,
    }
    this.user_id = id;
  
    this.botones_form = true;
    this.mostrar_form('ver');
  }


  editar(){
    this.$usuarios.editar(this.user_id, this.obj_usuario).subscribe((datos:any) => {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }



}
