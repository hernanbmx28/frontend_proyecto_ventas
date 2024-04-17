import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { ProductosComponent } from './productos/productos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { LoginComponent } from './login/login.component';
import { NoEncontroComponent } from './no-encontro/no-encontro.component';
import { validaruserGuard } from './guard/validaruser.guard';
import { PedidoinsertarComponent } from './pedidoinsertar/pedidoinsertar.component';

const routes: Routes = [

  {
    path: '', component: MainComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [validaruserGuard] },
      { path: 'ordenes', component: OrdenesComponent, canActivate: [validaruserGuard]},
      { path: 'productos', component: ProductosComponent, canActivate: [validaruserGuard]},
      { path: 'usuarios', component: UsuariosComponent, canActivate: [validaruserGuard]},
      { path: 'clientes', component: ClientesComponent, canActivate: [validaruserGuard]},
      { path: 'categoria', component: CategoriaComponent, canActivate: [validaruserGuard]},
      { path: 'proveedor', component: ProveedorComponent, canActivate: [validaruserGuard]},
      { path: 'pedidoins', component: PedidoinsertarComponent, canActivate: [validaruserGuard]},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
    ]
  },

  {path: 'login', component: LoginComponent},
  {path: '**', component: NoEncontroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
