export interface Ability {
    effect: string;
    type: AbilityType;
}

export enum AbilityType {
    Combat = "Combat",
    In = "In",
    Out = "Out",
    Static = "Static",
    Support = "Support"
}