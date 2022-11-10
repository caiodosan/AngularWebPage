import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-categoria-editar',
  templateUrl: './categoria-editar.component.html',
  styleUrls: ['./categoria-editar.component.scss']
})
export class CategoriaEditarComponent implements OnInit {
  categoriaId!: number;
  categoriaForm! :FormGroup;
  nome : String ='';
  imagemurl : String ='';


  constructor(private router : Router,private route:ActivatedRoute,private api: ApiService, private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.getCategoria(this.route.snapshot.params['id']);
    this.categoriaForm = this.formBuilder.group({
      'categoriaId': [null],
      'nome': [null,Validators.required],
      'imagemUrl' : [null, Validators.required]
    });
  }

  getCategoria(id:any){
    this.api.getCategoria(id).subscribe(data => {
      this.categoriaId = data.categoriaId;
      this.categoriaForm.setValue({
        categoriaId : data.categoriaId,
        nome : data.nome,
        imagemUrl : data.imagemUrl
      });
    });
  }

  updateCategoria(form : NgForm) {
    this.api.updateCategoria(this.categoriaId,form).subscribe(res => {
        this.router.navigate(['/categoria-detalhe/' + this.categoriaId]);
    },(err) =>{
      console.log(err);
    });
  }

}
