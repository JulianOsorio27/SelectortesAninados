import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PaisSmall, Pais } from '../interface/paises';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _baseURL = 'https://restcountries.com/v3.1'
  private _regiones = [ 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania' ];

  get regiones():string[] {
    return [...this._regiones];
  }

  constructor(
    private _http:HttpClient  ) { }

  
  getPaisesPorRegion  ( region:string ): Observable<PaisSmall[]> {
    const url = `${this._baseURL}/region/${region}?fields=cca3,name`;

    return this._http.get<PaisSmall[]>( url );

  }

  getPaisFrontera ( codigo:string ):Observable <Pais[] | null >  {

    if (!codigo) {
      return of( null )
    }

    const url = `${this._baseURL}/alpha/${codigo}`;

    return this._http.get<Pais[]>(url);
  }

 







}
