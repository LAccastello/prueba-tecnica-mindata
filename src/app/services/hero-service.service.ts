import { Injectable, Signal, signal } from '@angular/core';
import { IntHero, IntHeroService } from '../interfaces/hero.interface';
import heroMockData from './mocks/hero-mock.json';

@Injectable()
export class HeroService implements IntHeroService {
  heros = signal<IntHero[]>(heroMockData);
  isSaved = false;

  registerHero(hero: IntHero): void {
    this.heros.update(heros => [...heros, hero]);
  }

  getHeroes(): Signal<IntHero[]> {
    return this.heros.asReadonly();
  }

  // getHeroById(heroId: string): IntHero {
  //   return this.heros(heros => heros.);
  // }

  getHeroesByName(name: string): void {
    // if (!this.isSaved) {
    //   this.isSaved = true;
    //   localStorage.setItem('heros', JSON.stringify(this.heros()));
    // }
    this.heros.update(herosItems =>
      herosItems.filter(hero =>
        hero.name.toLowerCase().includes(name.toLowerCase())
      )
    );
    // this.heros().filter(hero =>
    //   hero.name.toLowerCase().includes(name.toLowerCase())
    // );
  }

  updateHero(updatedHero: IntHero): void {
    this.heros.update(heros =>
      heros.map(hero => (hero.id === updatedHero.id ? updatedHero : hero))
    );
  }

  deleteHero(heroId: number): void {
    this.heros.update(heros =>
      heros
        .filter(items => items.id !== heroId)
        .map((hero, index) => ({ ...hero, id: index + 1 }))
    );
  }
}
