import { Injectable ,} from '@angular/core';
import {User} from 'src/model/user';
import {Categoria} from 'src/model/categoria';
import {Observable,of,throwError} from 'rxjs';
import {catchError,tap,map} from 'rxjs/operators';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';

const apiUrl = "https://localhost:7134/Categorias";
const apiLoginUrl = "https://localhost:7134/api/autoriza/login";
var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};

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
