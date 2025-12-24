import { Attack, Card as TradingCard } from "../db"
import { UseFieldArrayUpdate, useForm } from "react-hook-form"
import { CardContent } from "./ui/card"
import { Input } from "./ui/input"

export interface AttackFormProps {
    update: UseFieldArrayUpdate<TradingCard, "slots">
    index: number
    value: Attack
}

export const AttackForm = ({value, index, update}: AttackFormProps) => {

  const {
    register,
    formState: { errors },
  } = useForm<Attack>()


  return (
      <CardContent className="space-y-4">
        <Input placeholder="name" defaultValue={value.name} {...register("name", { required: true })} />
        <Input placeholder="cost" defaultValue={value.cost} {...register("cost", { required: true })} />
        <Input placeholder="effect text" defaultValue={value.effect} {...register("effect", { required: true })} />
      </CardContent>

  )
}
