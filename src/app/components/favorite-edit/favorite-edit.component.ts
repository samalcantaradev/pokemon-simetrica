import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Favorito } from '../../models/favorito.model';
import { FavoritePokemonService } from '../../services/favorite-pokemon.service';

@Component({
  selector: 'app-favorite-edit',
  templateUrl: './favorite-edit.component.html',
  styleUrls: ['./favorite-edit.component.css']
})
export class FavoriteEditComponent implements OnInit {
  favorito: Favorito | undefined;
  @ViewChild('favoritoForm') favoritoForm!: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private favoritePokemonService: FavoritePokemonService
  ) { }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.favorito = this.favoritePokemonService.getFavorite(name);
    }
  }

  updateFavorite(): void {
    if (this.favorito && this.favoritoForm.valid) {
      this.favoritePokemonService.updateFavorite(this.favorito);
      this.router.navigate(['/favoritos']);
    }
  }
}
