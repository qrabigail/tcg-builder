export interface Ability {
    effect: string;
    type: AbilityType;
}

export enum AbilityType {
    Combat = "Combat",
    Death = "Death",
    In = "In",
    Out = "Out",
    Static = "Static",
    Support = "Support"
}