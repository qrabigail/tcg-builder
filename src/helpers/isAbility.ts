import { Ability, Attack } from "../db"

export const isAbility = (slot: Attack | Ability): slot is Ability => {
  return (slot as Ability).type !== undefined
}