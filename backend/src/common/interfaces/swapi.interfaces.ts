import { SwapiPerson } from "src/people/interfaces/person.interface";
import { SortOrder } from "../enums/swapi.enums";
import { SwapiPlanet } from "src/planets/interfaces/planet.interface";
import { SwapiStarship } from "src/starships/interfaces/starship.interface";
import { SwapiVehicle } from "src/vehicles/interfaces/vehicle.interface";

/**
 * Interface for the query parameters accepted by findAll.
 */
export interface ResourceQuery {
  page?: number;
  sort?: keyof SwapiPerson | keyof SwapiPlanet | keyof SwapiStarship | keyof SwapiVehicle | keyof SwapiCommonResource;
  limit?: number;
  order?: SortOrder;
  [key: string]: any;
}

export interface SwapiCommonResource {
  name: string;
  url: string;
  created: string;
  edited: string;
}

export interface SwapiPaginatedResponse<T> {
  limit: number;
  total: number;
  totalPages: number;
  page: number;
  results: T[];
}