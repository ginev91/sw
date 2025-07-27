import { SwapiCommonResource } from "src/common/interfaces/swapi.interfaces";

export interface SwapiPlanet extends SwapiCommonResource {
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  [key: string]: any;
}