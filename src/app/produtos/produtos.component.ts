import { Produto } from './../../model/produto';
import { ApiService } from 'src/services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse,HttpHeaderResponse } from '@angular/common/http';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss','../categorias/categorias.component.scss']
})
export class ProdutosComponent implements OnInit {
  pagenum : String ='';
  pagesize : String ='';
  produtos! : Produto[];

  constructor(private api : ApiService,private route:ActivatedRoute) { }

  ngOnInit():void {
  }
  getProdutos(pagenum:String,pagesize:String) {
    this.api.getProdutos(pagenum,pagesize).subscribe(res => {
      console.log('pronto');
      console.table(res)
      this.produtos = res;
    });

  }
}
