import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../../services/poke-api.service';
import { PageEvent } from '@angular/material/paginator';
import { Favorito } from '../../models/favorito.model';
import { FavoritePokemonService } from '../../services/favorite-pokemon.service'; // Importa el servicio aquí

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  allPokemons: any[] = [];
  initialPokemons: any[] = [];
  types: string[] = [];
  abilities: string[] = [];
  abilityFilter: string = 'all';
  sortOrder = 'lowest';
  totalPokemons = 0;
  heightFilter: string = 'all';
  weightFilter: string = 'all';
  pageSize = 20;

  constructor(
    private pokeApiService: PokeApiService,
    private favoritePokemonService: FavoritePokemonService
  ) {
    this.allPokemons = [];
  }

  getPokemonTypes(pokemon: any): string {
    return pokemon.types.map((type: any) => type.type.name).join(', ');
  }

  ngOnInit(): void {
    this.loadAllPokemons();
    this.loadTypes();
    this.loadAbilities();
    this.resetFilters();
  }

  loadAllPokemons(): void {
    this.pokeApiService.getPokemons(0, 1010).subscribe((data) => {
      this.initialPokemons = data;
      this.allPokemons = data;
      this.pokemons = data.slice(0, this.pageSize);
      this.totalPokemons = data.length;
    });
  }

  loadTypes(): void {
    this.pokeApiService.getTypes().subscribe((data) => {
      this.types = data.results.map((type: any) => type.name);
    });
  }

  loadAbilities(): void {
    this.pokeApiService.getAbilities().subscribe((data) => {
      this.abilities = data.results.map((ability: any) => ability.name);
    });
  }

  addToFavorites(pokemon: any): void {
    const favorito: Favorito = {
      name: pokemon.name,
      alias: pokemon.name,
      createdAt: new Date(),
      number: pokemon.id,
      image: pokemon.sprites?.front_default
    };
    const favoritos = this.favoritePokemonService.getFavorites();
    if (!favoritos.find(f => f.name === favorito.name)) {
      this.favoritePokemonService.addFavorite(favorito);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.pokemons = this.allPokemons.filter((pokemon) =>
      pokemon.name.includes(filterValue)
    );
  }
  filterByType(type: string) {
    if (type === 'all') {
      this.applyFilters();
    } else {
      this.pokeApiService.getPokemonsByType(type).subscribe((data: any[]) => {
        const pokemonsOfType = data;
        this.allPokemons = this.allPokemons.filter((pokemon) =>
          pokemonsOfType.some((p: any) => p.name === pokemon.name)
        );
        this.pokemons = this.allPokemons.slice(0, this.pageSize);
        this.totalPokemons = this.allPokemons.length;
      });
    }
  }

  filterByAbility() {
    this.applyFilters();
  }

  filterByHeight() {
    this.applyFilters();
  }

  filterByWeight() {
    this.applyFilters();
  }

  resetFilters(): void {
    this.abilityFilter = 'all';
    this.heightFilter = 'all';
    this.weightFilter = 'all';
    this.sortOrder = 'lowest';
    this.allPokemons = this.initialPokemons;
    this.pokemons = this.initialPokemons.slice(0, this.pageSize);
  }

  onPageChange(event: PageEvent): void {
    const offset = event.pageIndex * event.pageSize;
    this.pokemons = this.allPokemons.slice(offset, offset + event.pageSize);
  }

  sortPokemons(): void {
    switch (this.sortOrder) {
      case 'lowest':
        this.allPokemons.sort((a, b) => a.id - b.id);
        break;
      case 'highest':
        this.allPokemons.sort((a, b) => b.id - a.id);
        break;
      case 'az':
        this.allPokemons.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'za':
        this.allPokemons.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
    this.pokemons = this.allPokemons.slice(0, this.pageSize);
  }

  applyFilters(): void {
    let filteredPokemons = this.initialPokemons;

    if (this.abilityFilter !== 'all') {
      filteredPokemons = filteredPokemons.filter((pokemon) =>
        pokemon.abilities.some(
          (a: any) => a.ability.name === this.abilityFilter
        )
      );
    }

    if (this.heightFilter !== 'all') {
      if (this.heightFilter === 'small') {
        filteredPokemons = filteredPokemons.filter(
          (pokemon) => pokemon.height <= 10
        );
      } else if (this.heightFilter === 'medium') {
        filteredPokemons = filteredPokemons.filter(
          (pokemon) => pokemon.height > 10 && pokemon.height <= 20
        );
      } else if (this.heightFilter === 'large') {
        filteredPokemons = filteredPokemons.filter(
          (pokemon) => pokemon.height > 20
        );
      }
    }

    if (this.weightFilter !== 'all') {
      if (this.weightFilter === 'light') {
        filteredPokemons = filteredPokemons.filter(
          (pokemon) => pokemon.weight <= 50
        );
      } else if (this.weightFilter === 'middle') {
        filteredPokemons = filteredPokemons.filter(
          (pokemon) => pokemon.weight > 50 && pokemon.weight <= 100
        );
      } else if (this.weightFilter === 'heavy') {
        filteredPokemons = filteredPokemons.filter(
          (pokemon) => pokemon.weight > 100
        );
      }
    }

    this.allPokemons = filteredPokemons;
    this.pokemons = filteredPokemons.slice(0, this.pageSize);
    this.totalPokemons = filteredPokemons.length;
  }
}
