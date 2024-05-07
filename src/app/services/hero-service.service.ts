import { Injectable, Signal, signal } from '@angular/core';
import { IntHero, IntHeroService } from '../interfaces/hero.interface';
import heroMockData from './mocks/hero-mock.json';

@Injectable()
export class HeroService implements IntHeroService {
  // Se realiza una primera carga de héroes desde un mock
  heros = signal<IntHero[]>(heroMockData);

  registerHero(hero: IntHero): void {
    this.heros.update(heros => [...heros, hero]);
  }

  getHeroes(): Signal<IntHero[]> {
    return this.heros.asReadonly();
  }

  getHeroById(heroId: number): IntHero | undefined {
    return this.heros().find(hero => hero.id === heroId);
  }

  getHeroesByName(name: string): void {
    this.heros.update(herosItems =>
      herosItems.filter(hero =>
        hero.name.toLowerCase().includes(name.toLowerCase())
      )
    );
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
