export interface Ability {
    effect: string;
    type: AbilityType;
}

export enum AbilityType {
    Combat,
    Enter,
    Exit,
    Static,
    Support
}