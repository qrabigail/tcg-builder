import { Ability } from "./Ability";
import { Attack } from "./Attack";

export interface Card {
    id: string;
    name: string;
    level: number;
    hp: number;
    attack: number;
    speed: number;
    art: string; // TODO image upload
    type: string; // TODO: should this be an enum?
    version: string;
    slots: Array<Ability | Attack>
    trigger?: string;
}