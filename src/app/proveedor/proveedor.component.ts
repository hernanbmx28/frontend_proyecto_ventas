import { Component } from '@angular/core';
import { ProveedorService } from '../servicios/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent {

  proveedor: any;

  id_proveedor:any;

  obj_proveedor = {
    nombre: "",
    telefono: "",
    direccion: "",
    correo: "",
  }

  validar_nombre=true;
  validar_telefono=true;
  validar_direccion=true;
  validar_correo=true;
  
  mform=false;

  botones_form = false;

  constructor(private $proveedor:ProveedorService){}

  ngOnInit(): void{
    this.consulta();
  }

  consulta(){
    this.$proveedor.consultar().subscribe((resultado:any) => {
      this.proveedor = resultado;
    })
  }

  contar(){
    this.proveedor.contar().subscribe((resultado:any) =>{
      this.proveedor = resultado;
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
    this.obj_proveedor = { 
      nombre: "",
      telefono: "",
      direccion: "",
      correo: "",
    }

  }


  validar(funcion: any){
    if(this.obj_proveedor.nombre == ""){
      this.validar_nombre=false;
    }else{
      this.validar_nombre=true;
    }

    if(this.obj_proveedor.telefono == ""){
      this.validar_telefono=false;
    }else{
      this.validar_telefono=true;
    }

    if(this.obj_proveedor.correo == ""){
      this.validar_correo=false;
    }else{
      this.validar_correo=true;
    }

    if(this.obj_proveedor.direccion == ""){
      this.validar_direccion=false;
    }else{
      this.validar_direccion=true;
    }

    if(this.validar_nombre==true && this.validar_telefono==true && this.validar_correo==true && this.validar_direccion==true &&
      funcion== 'guardar'){
      this.guardar();
    }

    if(this.validar_nombre==true && this.validar_telefono==true && this.validar_correo==true && this.validar_direccion==true && 
      funcion== 'editar'){
      this.editar();
    }

  }

  guardar(){
    this.$proveedor.insertar(this.obj_proveedor).subscribe((datos:any) => {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }
  

  eliminar(id:number){

    Swal.fire({
      title: "Desea eliminar el Proveedor?",
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
        this.$proveedor.eliminar(id).subscribe((datos:any) => {
          if(datos ['resultado']=='OK'){
            this.consulta(); 
           }
        })
        ///////////

        Swal.fire({
          title: "Proveedor Eliminado !",
          text: "El Proveedor a ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }


  cargar_datos(items: any, id:number){

    this.obj_proveedor = {
      nombre: items.nombre,
      telefono: items.telefono,
      direccion: items.direccion,
      correo: items.correo,
    }
    this.id_proveedor = id;
  
    this.botones_form = true;
    this.mostrar_form('ver');
  }


  editar(){
    this.$proveedor.editar(this.id_proveedor, this.obj_proveedor).subscribe((datos:any) => {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }
  


}
