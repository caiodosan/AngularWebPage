import { Injectable ,} from '@angular/core';
import {User} from 'src/model/user';
import {Categoria} from 'src/model/categoria';
import {Produto} from 'src/model/produto';
import {Observable,of,throwError} from 'rxjs';
import {catchError,tap,map} from 'rxjs/operators';
import {HttpClient,HttpHeaders,HttpHeaderResponse} from '@angular/common/http';

const apiUrl = "https://localhost:7134/Categorias";
const apiLoginUrl = "https://localhost:7134/api/autoriza/login";
const apiProdutoUrl = 'https://localhost:7134/Produtos?'; //PageNumber=1&PageSize=3
var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};
var httphead = {headers: new HttpHeaders({ observe: 'response' })};
@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  montaHeaderToken(){
    var token= localStorage.getItem("jwt");
    console.log("kwt header token" + token);
    httpOptions = {headers: new HttpHeaders({"Authorization":"Bearer " + token, "Content-Type": "application/json"})};
  }

  Login (User:any): Observable<User> {
    return this.http.post<User>(apiLoginUrl,User)
  }

  getProdutos(pagenum: String,pagesize : String) :Observable<Produto[]> {
    const apiPag = apiProdutoUrl + 'PageNumber=' + pagenum + '&PageSize=' +pagesize
    return this.http.get<Produto[]>(apiPag,httphead).pipe(
      tap(Prod =>  console.log("leu as categorias")),
      catchError(this.handleError('getProdutos',[]))
    )
  }

  addProduto(Produto: any): Observable<any> {
    return this.http.post<Produto>(apiProdutoUrl,Produto,httpOptions).pipe(
      tap((Produto:Produto) => console.log(`adicionou o Produto w/ id= ${Produto}`)),
      catchError(this.handleError('getProdutos'))
    )
  }

  getCategorias (): Observable<Categoria[]> {
    this.montaHeaderToken();
    console.log(httpOptions.headers);
    return this.http.get<Categoria[]>(apiUrl,httpOptions).pipe(
      tap(Categorias => console.log("leu as categorias")),
      catchError(this.handleError('getCategorias',[]))
    )
  }

  getCategoria (id: number): Observable<Categoria> {
    this.montaHeaderToken();
    const url = `${apiUrl}/${id}`;
    return this.http.get<Categoria>(url,httpOptions).pipe(
      tap(_ => console.log(`leu as categoria id = ${id}`)),
      catchError(this.handleError<Categoria>(`getCategoria id=${id}`))
    )
  }

  addCategoria (Categoria: any): Observable<Categoria> {
    this.montaHeaderToken();
    return this.http.post<Categoria>(apiUrl,Categoria, httpOptions).pipe(
      tap((Categoria:Categoria) => console.log(`adicionou a Categoria w/ id= ${Categoria}`)),
      catchError(this.handleError<Categoria>(`addCategoria`))
    )
  }

  updateCategoria (id: number, Categoria: any): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url,Categoria,httpOptions).pipe(
      tap(_ => console.log(`Atualiza a categoria id = ${id}`)),
      catchError(this.handleError<any>(`updateCategoria`))
    )
  }

  deleteCategoria (id: number): Observable<Categoria> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Categoria>(url,httpOptions).pipe(
      tap(_ => console.log(`remove a categoria id = ${id}`)),
      catchError(this.handleError<Categoria>(`deleteCategoria`))
    )
  }


  private handleError<T> (operation = 'operation',result? :T){
    return (error: any) : Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

}
