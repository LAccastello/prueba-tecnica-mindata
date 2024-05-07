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
  getHeroById(heroId: number): IntHero | undefined;

  // Consultar todos los súper héroes que contienen el valor de un parámetro en su nombre
  getHeroesByName(name: string): void;

  // Modificar un súper héroe
  updateHero(updatedHero: IntHero): void;

  // Eliminar un súper héroe
  deleteHero(heroId: number): void;
}
