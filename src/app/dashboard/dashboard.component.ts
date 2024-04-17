import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../servicios/product.service';
import { ClientesService } from '../servicios/clientes.service';
import { ProveedorService } from '../servicios/proveedor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  productos: any;
  proveedor: any;
  pedidoss: any;
  clientes: any;


  constructor(private router:Router, private $proveedor:ProveedorService, private $products: ProductService, private $clientes: ClientesService,){}

  ngOnInit(): void {
    this.productos = sessionStorage.getItem
    
  }

  contar(){
    this.proveedor.contar().subscribe((resultado:any) =>{
      this.proveedor = resultado;
    })
  }

}
