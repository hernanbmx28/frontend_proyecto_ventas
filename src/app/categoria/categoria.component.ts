import { Component } from '@angular/core';
import { CategoriaService } from '../servicios/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {

  categoria: any;

  id_categoria:any;
  nombre_cat: any;
  nombre: any; 

  obj_categoria = {
    nombre: "",
  }

  validar_nombre=true;
  mform=false;

  botones_form = false;

  constructor(private $categoria:CategoriaService){}

  ngOnInit(): void{
    this.consulta();
  }

  consulta(){
    this.$categoria.consultar().subscribe((resultado:any) => {
      this.categoria = resultado;
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
    this.obj_categoria = {
      nombre: "",
    }
  }

  validar(funcion: any){
    if(this.obj_categoria.nombre == ""){
      this.validar_nombre=false;
    }else{
      this.validar_nombre=true;
    }

    if(this.validar_nombre==true && funcion == 'guardar'){
      this.guardar();
    }

    if(this.validar_nombre==true && funcion== 'editar'){
      this.editar();
    }
  }

  guardar(){
    this.$categoria.insertar(this.obj_categoria).subscribe((datos:any) => {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');

  }


  eliminar(id:number){

    Swal.fire({
      title: "Desea eliminar la Categoria?",
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
        this.$categoria.eliminar(id).subscribe((datos:any) => {
          if(datos ['resultado']=='OK'){
            this.consulta(); 
           }
        })
        ///////////

        Swal.fire({
          title: "Categoria Eliminada !",
          text: "La Categoria ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }


  cargar_datos(items: any, id:number){

    this.obj_categoria = {
      nombre: items.nombre,
    }
    this.id_categoria = id;
  
    this.botones_form = true;
    this.mostrar_form('ver');
  }

  editar(){
    this.$categoria.editar(this.id_categoria, this.obj_categoria).subscribe((datos:any) => {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }


  filtrar(){
    this.$categoria.filtro(this.nombre_cat).subscribe((result:any)=>{
      this.categoria=result;
      this.nombre = this.categoria.nombre;
      console.log(this.categoria);
    })

  }

}
