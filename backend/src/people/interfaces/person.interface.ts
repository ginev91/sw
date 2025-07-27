import { SwapiCommonResource } from "src/common/interfaces/swapi.interfaces";

export interface SwapiPerson extends SwapiCommonResource {
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  [key: string]: any;
}