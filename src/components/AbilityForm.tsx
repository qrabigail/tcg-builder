import { Ability, AbilityType, Card as TradingCard } from "../db"
import {  UseFieldArrayUpdate, UseFormRegister } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"

export interface AbilityFormProps {
    register: UseFormRegister<TradingCard>
    update: UseFieldArrayUpdate<TradingCard, "slots">
    index: number
    value: Ability
}
export const AbilityForm = ({value, index, register, update}: AbilityFormProps) => {
  // todo ability type is not propogating
  return (
      <div>
        <Select 
          defaultValue={value.type} 
          {...register(`slots.${index}.type`, { required: true })} 
          onValueChange={(type) => update(index, {...value, type: type as AbilityType})}
        >
          <SelectTrigger >
            <SelectValue placeholder="Ability Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={AbilityType.Combat}>Combat</SelectItem>
            <SelectItem value={AbilityType.Death}>Death</SelectItem>
            <SelectItem value={AbilityType.In}>In</SelectItem>
            <SelectItem value={AbilityType.Out}>Out</SelectItem>
            <SelectItem value={AbilityType.Static}>Static</SelectItem>
            <SelectItem value={AbilityType.Support}>Support</SelectItem>
          </SelectContent>
        </Select>

        <Textarea placeholder="effect text" defaultValue={value.effect} {...register(`slots.${index}.effect`, { required: true })} />
      </div>

  )
}
