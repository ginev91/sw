import { SwapiCommonResource } from "src/common/interfaces/swapi.interfaces";

export interface SwapiStarship extends SwapiCommonResource {
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  [key: string]: any;
}