import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { FavoriteEditComponent } from './components/favorite-edit/favorite-edit.component';

const routes: Routes = [
  { path: 'pokemons', component: PokemonListComponent },
  { path: 'favorites', component: FavoriteListComponent },
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
  { path: 'favorite-edit/:name', component: FavoriteEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
