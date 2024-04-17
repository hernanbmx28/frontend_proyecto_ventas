import { Component, numberAttribute } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ProductService } from '../servicios/product.service';
import { ClientesService } from '../servicios/clientes.service';
import { PedidoService } from '../servicios/pedido.service';
import { ProveedorService } from '../servicios/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidoinsertar',
  templateUrl: './pedidoinsertar.component.html',
  styleUrls: ['./pedidoinsertar.component.css']
})
export class PedidoinsertarComponent {

  products: any;
  clientes: any;
  ident_cliente = "";
  nombre_cliente = "";
  id_cliente: any;
  matriz_producto: any = [];
  arreglo_productos: any = [];
  total: any = 0;
  proveedor: any;

  pedido ={
    fecha:"",
    fo_cliente: 0,
    productos:[],
    subtotal: 0,
    total: 0,
    fo_vendedor: 0

  }

 

  constructor(private router:Router,private $proveedor: ProveedorService ,private $products: ProductService, private $clientes: ClientesService, private $ordenes: PedidoService ){}

  ngOnInit(): void{
    this.consulta_productos();

  }

  consulta_productos(){
    this.$products.consultar().subscribe((result:any)=>{
      this.products = result;
    })
  }

  consulta_cliente(){
    this.$clientes.filtro(this.ident_cliente).subscribe((result:any)=>{
      this.clientes=result;
      this.nombre_cliente = this.clientes.nombre_cliente;
      console.log(this.clientes);
    })

  }

  seleccionar(valores:any, id:number){
    let cantidad = Number(prompt("Ingrese la cantidad a llevar"));
    this.arreglo_productos = [valores.codigo, valores.nombre, Number(valores.precio_venta), cantidad, cantidad * Number
    (valores.precio_venta)];
    this.matriz_producto.push(this.arreglo_productos);

    let largo = this.matriz_producto.length;
    this.total = 0;
    for(let i=0; i<largo; i++){
      this.total = this.total + this.matriz_producto[i][4];
    }
    //console.log(this.matriz_producto);
    }

  guardar(){
    let fecha = new Date();
    this.pedido.fecha = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`;
    this.pedido.fo_cliente = Number(this.clientes.id_cliente);
    this.pedido.productos = this.matriz_producto;
    this.pedido.subtotal = this.total;
    this.pedido.total = this.total;
    this.pedido.fo_vendedor = Number(sessionStorage.getItem('id'));
    console.log(this.pedido);
    
    this.$ordenes.insertar(this.pedido).subscribe((datos:any)=>{
      if(datos['resultado']=='OK'){
        console.log(datos['resultado']);
        this.router.navigate(['ordenes']);
      }
    });
  
  }

  contarprov(){
    this.proveedor.contar().subscribe((resultado:any) =>{
      this.proveedor = resultado;
    })
  }

  limpiar(){
    this.arreglo_productos= []


  }

  eliminar(){
    this.arreglo_productos= [] 

  }



  



  }

