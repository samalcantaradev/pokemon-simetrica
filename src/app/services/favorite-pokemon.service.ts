import { Injectable } from '@angular/core';
import { Favorito } from '../models/favorito.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritePokemonService {
  constructor() {}

  getFavorites(): Favorito[] {
    const favoritos = sessionStorage.getItem('favoritos');
    return favoritos ? JSON.parse(favoritos) : [];
  }

  getFavorite(name: string): Favorito | undefined {
    const favoritos = this.getFavorites();
    return favoritos.find((favorito) => favorito.name === name);
  }

  addFavorite(favorito: Favorito): void {
    const favoritos = this.getFavorites();
    favoritos.push(favorito);
    sessionStorage.setItem('favoritos', JSON.stringify(favoritos));
  }

  updateFavorite(favorito: Favorito): void {
    const favoritos = this.getFavorites();
    const index = favoritos.findIndex(f => f.name === favorito.name);
    if (index !== -1) {
      favoritos[index] = favorito;
      sessionStorage.setItem('favoritos', JSON.stringify(favoritos));
    }
  }
  
  deleteFavorite(favorito: Favorito): void {
    const favoritos = this.getFavorites();
    const index = favoritos.findIndex((f) => f.name === favorito.name);
    if (index !== -1) {
      favoritos.splice(index, 1);
      sessionStorage.setItem('favoritos', JSON.stringify(favoritos));
    }
  }
}
