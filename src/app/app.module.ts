import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { ProductosComponent } from './productos/productos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { LoginComponent } from './login/login.component';
import { NoEncontroComponent } from './no-encontro/no-encontro.component';
import { PedidoinsertarComponent } from './pedidoinsertar/pedidoinsertar.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainComponent,
    OrdenesComponent,
    ProductosComponent,
    ClientesComponent,
    UsuariosComponent,
    CategoriaComponent,
    ProveedorComponent,
    LoginComponent,
    NoEncontroComponent,
    PedidoinsertarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ]
  ,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
