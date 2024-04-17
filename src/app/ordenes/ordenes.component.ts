import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { PedidoService } from '../servicios/pedido.service';
import { CategoriaService } from '../servicios/categoria.service';
import { ClientesService } from '../servicios/clientes.service';
import { UsuariosService } from '../servicios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent {

  ventas: any;
  clientes: any;
  usuarios: any;
  modal = false;
  productos: any;
  total: any;

  constructor(private router:Router, private $pedido: PedidoService, private $cli: ClientesService, private $usu: UsuariosService){}

  ngOnInit(): void{
    this.consulta();
    this.consulta_c();
    this.consulta_v();

  }

  consulta(){
    this.$pedido.consultar().subscribe((result:any) => {
      this.ventas = result;
    })
  }

  consulta_c(){
    this.$cli.consultar().subscribe((resultado:any) => {
      this.clientes = resultado;

    })

  }

  consulta_v(){
    this.$usu.consultar().subscribe((resultado:any) => {
      this.usuarios = resultado;

    })

  }



  insertar(){
    this.router.navigate(['pedidoins']);
  }

  consultap(id:number){
    this.$pedido.consultarp(id).subscribe((result:any) => {
      this.productos = result;
      this.total=0;
      for(let i=0; i<this.productos.length; i++){
        this.total = this.total + this.productos[i][4];
      }
    })

  }


  mostrar_modal(dato:any, id:number){
    switch(dato){
      case 0:
        this.modal = false;
      break;
      case 1:
        this.modal = true;
        this.consultap(id);
        break;

    }

  }


  eliminar(id:number){

    Swal.fire({
      title: "Desea eliminar el Pedido?",
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
        this.$pedido.eliminar(id).subscribe((datos:any) => {
          if(datos ['resultado']=='OK'){
            this.consulta(); 
           }
        })
        ///////////

        Swal.fire({
          title: "Pedido Eliminado !",
          text: "El Pedido ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }



}
