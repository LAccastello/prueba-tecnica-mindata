import { Injectable, Signal, signal } from '@angular/core';
import { IntHero, IntHeroService } from '../interfaces/hero.interface';
import heroMockData from './mocks/hero-mock.json';

@Injectable()
export class HeroService implements IntHeroService {
  heros = signal<IntHero[]>(heroMockData);

  registerHero(hero: IntHero): void {
    this.heros.update(heros => [...heros, hero]);
  }

  getHeroes(): Signal<IntHero[]> {
    return this.heros.asReadonly();
  }

  // getHeroById(heroId: string): IntHero {
  //   return this.heros(heros => heros.);
  // }

  // getHeroesByName(name: string): Observable<IntHero[]> {
  //   return this.heros$.pipe(
  //     map(heroes =>
  //       heroes.filter(hero =>
  //         hero.name.toLowerCase().includes(name.toLowerCase())
  //       )
  //     )
  //   );
  // }

  updateHero(updatedHero: IntHero): void {
    this.heros.update(heros =>
      heros.map(hero => (hero.id === updatedHero.id ? updatedHero : hero))
    );
  }

  deleteHero(heroId: number) {
    this.heros.update(heros => heros.filter(items => items.id !== heroId));
  }
}
