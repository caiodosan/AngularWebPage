import { ApiService } from 'src/services/api.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Categoria } from 'src/model/categoria';


@Component({
  selector: 'app-produto-novo',
  templateUrl: './produto-novo.component.html',
  styleUrls: ['./produto-novo.component.scss','../categoria-nova/categoria-nova.component.scss','../categorias/categorias.component.scss']
})
export class ProdutoNovoComponent implements OnInit {

  produtoForm! : FormGroup;
  nome : String = "";
  imagemUrl: String = "";
  descricao : String = "";
  preco: number = 0;
  estoque: number = 0;
  categoriaId: number = 0;
  isLoadingResults = true;
  cat! : Categoria[];

  constructor(private api : ApiService,private router:Router, private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.produtoForm = this.formBuilder.group({
      'nome' : [null,Validators.required],
      'imagemUrl' : [null,Validators.required],
      'descricao' : [null,Validators.required],
      'preco' : [null,Validators.required],
      'estoque' : [null,Validators.required],
      'categoriaId' : [null,Validators.required]
    });
    this.api.getCategorias()
    .subscribe(res => {
      console.table(res)
      this.cat = res;
      this.isLoadingResults = false;

    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  addProduto(form :NgForm){
    this.api.addProduto(form)
    .subscribe(res => {
      this.router.navigate(['/produtos']);
    }, (err) => {
      console.log(err);
      console.log('Error no envio do produto')
    });
  }

}
