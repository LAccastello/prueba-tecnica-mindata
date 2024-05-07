import { Signal } from '@angular/core';

export interface IntHero {
  id: number;
  name: string;
  realName: string;
  powers?: string[];
}

export interface IntHeroService {
  // Registrar un nuevo super héroe
  registerHero(hero: IntHero): void;

  // Consultar todos los súper héroes
  getHeroes(): Signal<IntHero[]>;

  // Consultar un único súper héroe por id
  // getHeroById(heroId: string): IntHero;

  // // Consultar todos los súper héroes que contienen el valor de un parámetro en su nombre
  // getHeroesByName(name: string): IntHero;

  // // Modificar un súper héroe
  // updateHero(heroId: number, hero: IntHero): IntHero;

  // // Eliminar un súper héroe
  // deleteHero(heroId: number): IntHero;
}
