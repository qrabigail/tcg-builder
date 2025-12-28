import { Attack, Card as TradingCard } from "../db"
import { UseFormRegister } from "react-hook-form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

export interface AttackFormProps {
    index: number
    value: Attack
    register: UseFormRegister<TradingCard>
}

export const AttackForm = ({value, index, register}: AttackFormProps) => {


  return (

    <div className="grid grid-cols-2 gap-2">
        <Input placeholder="name"  defaultValue={value.name} {...register(`slots.${index}.name`, { required: true })} className="col-span-2"/>
        <Input placeholder="cost" defaultValue={value.cost} {...register(`slots.${index}.cost`, { required: true })} />
        <Input placeholder="damage" defaultValue={value.damage} {...register(`slots.${index}.damage`)} />
        <Textarea placeholder="effect text" defaultValue={value.effect} {...register(`slots.${index}.effect`)} className="col-span-2" />
      </div>

  )
}
