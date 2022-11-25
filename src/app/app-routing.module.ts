import { ProdutoNovoComponent } from './produto-novo/produto-novo.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriaDetalheComponent } from './categoria-detalhe/categoria-detalhe.component';
import { CategoriaNovaComponent } from './categoria-nova/categoria-nova.component';
import { CategoriaEditarComponent } from './categoria-editar/categoria-editar.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path:"login",
    component: LoginComponent,
    data: {title:"Login"}
  },
  {
    path:"categorias",
    component: CategoriasComponent,
    data: {title:"Lista de Categorias"}
  },
  {
    path:"produtos",
    component: ProdutosComponent,
    data: {title:"Lista de Produtos"}
  },
  {
    path:"produto-novo",
    component: ProdutoNovoComponent,
    data: {title:"Produto Novo"}
  },
  {
    path:"categoria-detalhe/:id",
    component: CategoriaDetalheComponent,
    data: {title:"Detalhe da Categoria"}
  },
  {
    path:"categoria-nova",
    component: CategoriaNovaComponent,
    data: {title:"Adicionar Categoria"}
  },
  {
    path:"categoria-editar/:id",
    component: CategoriaEditarComponent,
    data: {title:"Editar Categoria"}
  },
  {
    path:"",
    redirectTo: "/categorias",
    pathMatch: "full"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
