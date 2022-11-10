import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { Categoria } from 'src/model/categoria';
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  displayedColumns: string[] = ['nome','imagem','acao']
  dataSource! : Categoria[];
  isLoadingResults = true;
  cat! : Categoria[];

  @Output() todasCategorias = new EventEmitter<Categoria[]>();

  constructor(private api : ApiService) { }

  ngOnInit() {
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

  

  categorias($event: Categoria[]) {
    this.cat = $event;
  }

}
