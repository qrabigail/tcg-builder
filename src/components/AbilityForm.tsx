import { Ability, AbilityType, Card as TradingCard } from "../db"
import { UseFieldArrayUpdate, useForm } from "react-hook-form"
import { CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export interface AbilityFormProps {
    update: UseFieldArrayUpdate<TradingCard, "slots">
    index: number
    value: Ability
}
export const AbilityForm = ({value, index, update}: AbilityFormProps) => {

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<Ability>()

  return (
      <CardContent className="space-y-4">
        <Select defaultValue={value.type} {...register("type", { required: true })}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ability Type" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(AbilityType).map(
              (type) => {return <SelectItem value={type}>{type}</SelectItem>}
            )}
          </SelectContent>
        </Select>
        <Input placeholder="effect text" defaultValue={value.effect} {...register("effect", { required: true })} />
      </CardContent>

  )
}
