import { Component } from '@angular/core';
import { ClientesService } from '../servicios/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  clientes: any;
  id_cliente:any;

  obj_cliente = {
    identificacion: "",
    nombre_cliente: "",
    telefono_cliente: "",
    email_cliente: "",
    direccion_cliente: "",
  }

  validar_identificacion=true;
  validar_nombre=true;
  validar_telefono=true;
  validar_email=true;
  validar_direccion=true;
  mform=false;

  botones_form = false;

  constructor(private $clientes:ClientesService){}

  ngOnInit(): void{
    this.consulta();
  }

  consulta(){
    this.$clientes.consultar().subscribe((resultado:any) => {
      this.clientes = resultado;
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
    this.obj_cliente = {
      identificacion: "",
      nombre_cliente: "",
      telefono_cliente: "",
      email_cliente: "",
      direccion_cliente: "",
    }
  }


  validar(funcion: any){

    if(this.obj_cliente.identificacion == ""){
      this.validar_identificacion=false;
    }else{
      this.validar_identificacion=true;
    }

    if(this.obj_cliente.nombre_cliente == ""){
      this.validar_nombre=false;
    }else{
      this.validar_nombre=true;
    }

    if(this.obj_cliente.telefono_cliente == ""){
      this.validar_telefono=false;
    }else{
      this.validar_telefono=true;
    }

    if(this.obj_cliente.email_cliente == ""){
      this.validar_email=false;
    }else{
      this.validar_email=true;
    }

    if(this.obj_cliente.direccion_cliente == ""){
      this.validar_direccion=false;
    }else{
      this.validar_direccion=true;
    }

    if(this.validar_identificacion==true && this.validar_nombre==true && this.validar_telefono==true && this.validar_email==true && this.validar_direccion==true &&
      funcion== 'guardar' ){
      this.guardar();
    }

    if(this.validar_identificacion==true && this.validar_nombre==true && this.validar_telefono==true && this.validar_email==true && this.validar_direccion==true &&
      funcion== 'editar' ){
      this.editar();
    }


  }

  guardar(){
    this.$clientes.insertar(this.obj_cliente).subscribe((datos:any) => {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }

  eliminar(id:number){

    Swal.fire({
      title: "Desea eliminar el Cliente?",
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
        this.$clientes.eliminar(id).subscribe((datos:any) => {
          if(datos ['resultado']=='OK'){
            this.consulta(); 
           }
        })
        ///////////

        Swal.fire({
          title: "Cliente Eliminado !",
          text: "El Cliente ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }

  cargar_datos(items: any, id:number){

    this.obj_cliente = {
      identificacion: items.identificacion,
      nombre_cliente: items.nombre_cliente,
      telefono_cliente: items.telefono_cliente,
      email_cliente: items.email_cliente,
      direccion_cliente: items.direccion_cliente,
    }
    this.id_cliente = id;
  
    this.botones_form = true;
    this.mostrar_form('ver');
  }

  editar(){
    this.$clientes.editar(this.id_cliente, this.obj_cliente).subscribe((datos:any) => {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }



}
