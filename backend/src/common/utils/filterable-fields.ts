import { SwapiPerson } from '../../people/interfaces/person.interface';
import { SwapiVehicle } from '../../vehicles/interfaces/vehicle.interface';
import { SwapiStarship } from '../../starships/interfaces/starship.interface';
import { SwapiPlanet } from '../../planets/interfaces/planet.interface';

/**
 * Helper to create type-safe filterable fields arrays per resource.
 */
export function defineFilterableFields<T>(fields: (keyof T)[]): (keyof T)[] {
  return fields;
}

export const personFilterableFields = defineFilterableFields<SwapiPerson>([
  'name',
  'height',
  'mass',
  'hair_color',
  'skin_color',
  'eye_color',
  'birth_year',
  'gender'
]);

export const vehicleFilterableFields = defineFilterableFields<SwapiVehicle>([
  'name',
  'model',
  'manufacturer',
  'cost_in_credits',
  'length',
  'max_atmosphering_speed',
  'crew',
  'passengers',
  'cargo_capacity',
  'consumables',
  'vehicle_class'
]);

export const starshipFilterableFields = defineFilterableFields<SwapiStarship>([
  'name',
  'model',
  'manufacturer',
  'cost_in_credits',
  'length',
  'max_atmosphering_speed',
  'crew',
  'passengers',
  'cargo_capacity',
  'consumables',
  'hyperdrive_rating',
  'MGLT',
  'starship_class'
]);

export const planetFilterableFields = defineFilterableFields<SwapiPlanet>([
  'name',
  'rotation_period',
  'orbital_period',
  'diameter',
  'climate',
  'gravity',
  'terrain',
  'surface_water',
  'population'
]);