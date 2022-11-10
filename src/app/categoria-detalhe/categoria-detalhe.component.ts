import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Categoria } from 'src/model/categoria';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-categoria-detalhe',
  templateUrl: './categoria-detalhe.component.html',
  styleUrls: ['./categoria-detalhe.component.scss']
})
export class CategoriaDetalheComponent implements OnInit {
  categoria: Categoria = {categoriaId:0, nome:'', imagemUrl:''};
  isLoadingResults = true;

  constructor(private router : Router,private route:ActivatedRoute ,private api: ApiService, private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.getCategoria(Number(this.route.snapshot.params['id']));
  }

  getCategoria(id:number) {
    this.api.getCategoria(id).subscribe( data => {
      this.categoria = data;
      this.categoria.categoriaId = data.categoriaId
      console.log(this.categoria);
      this.isLoadingResults = false

    });
  }
  deleteCategoria(id:number) {
    this.api.deleteCategoria(id).subscribe(res => {
      this.router.navigate(['/categorias'])
    })
  }

}
