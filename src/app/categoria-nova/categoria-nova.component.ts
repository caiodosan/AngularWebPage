import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/model/categoria';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-categoria-nova',
  templateUrl: './categoria-nova.component.html',
  styleUrls: ['./categoria-nova.component.scss']
})
export class CategoriaNovaComponent implements OnInit {
  categoriaForm!: FormGroup;
  nome : String = "";
  imagemUrl: String = "";
  isLoadResults: boolean = false;

  constructor(private router : Router,private api: ApiService, private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.categoriaForm = this.formBuilder.group({
      'nome' : [null,Validators.required],
      'imagemUrl' : [null,Validators.required]
    });
  }
  
  addCat(form :NgForm) {
    this.isLoadResults = true;
    this.api.addCategoria(form)
    .subscribe(res => {
      this.isLoadResults = false;
      this.router.navigate(['/categorias']);
    }, (err) => {
      console.log(err);
      this.isLoadResults = false;
    });
  }
}
