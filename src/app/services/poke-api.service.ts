// poke-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private url: string = 'https://pokeapi.co/api/v2/pokemon?limit=1010&offset=0';
  [1]: any;

  constructor(private http: HttpClient) {}

  getPokemons(offset = 0, limit = 20): Observable<any> {
    return this.http
      .get<any>(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      )
      .pipe(
        switchMap((response: any) => {
          const requests = response.results
            .slice(0, Math.min(1010, response.results.length))
            .map((pokemon: any) => this.http.get(pokemon.url));
          return forkJoin(requests);
        })
      );
  }

  getPokemonsByType(type: string): Observable<any> {
    return this.http.get<any>(`https://pokeapi.co/api/v2/type/${type}`).pipe(
      switchMap((response: any) => {
        const requests = response.pokemon
          .filter(
            (pokemon: any) =>
              parseInt(pokemon.pokemon.url.split('/')[6]) <= 1010
          )
          .map((pokemon: any) => this.http.get(pokemon.pokemon.url));
        return forkJoin(requests);
      })
    );
  }

  getTypes(): Observable<any> {
    return this.http.get<any>('https://pokeapi.co/api/v2/type');
  }

  getAbilities(): Observable<any> {
    return this.http.get<any>('https://pokeapi.co/api/v2/ability');
  }
}
