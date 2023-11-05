import { Component, OnInit } from '@angular/core';
import { Favorito } from '../../models/favorito.model';
import { FavoritePokemonService } from '../../services/favorite-pokemon.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css'],
})
export class FavoriteListComponent implements OnInit {
  favoritos: Favorito[] = [];

  constructor(private favoritePokemonService: FavoritePokemonService) {}

  ngOnInit(): void {
    this.favoritos = this.favoritePokemonService.getFavorites();
  }

  deleteFavorite(favorito: Favorito): void {
    this.favoritePokemonService.deleteFavorite(favorito);
    this.favoritos = this.favoritePokemonService.getFavorites();
  }
}
