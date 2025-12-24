import { Ability, AbilityType, Attack, Card as TradingCard, db } from "../db"
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { AbilityForm } from "./AbilityForm"
import { AttackForm } from "./AttackForm"
import { Field, FieldError } from "./ui/field"

const isAbility = (slot: Attack | Ability): slot is Ability => {
  return (slot as Ability).type !== undefined
}
const MAX_SLOTS = 3

export const AddCardForm = () => {

  async function addCard(card: TradingCard) {
    try {
      // Add the new card!
      const id = await db.cards.add({...card })

    } catch (error) {
      window.alert(`oop: ${error}`)
    }
  }
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TradingCard>()

    const { fields: slots, append, update, remove } = useFieldArray({
    control,
    name: "slots"
  });
  const onSubmit: SubmitHandler<TradingCard> = addCard

  console.log(watch("name"))

  return (
    <Card className="w-full sm:max-w-md">
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="name" {...register("name", { required: true })} />
          <Input placeholder="level" {...register("level", { required: true })} />
          <Input placeholder="HP" {...register("hp", { required: true })} />
          <Input placeholder="attack" {...register("attack", { required: true })} />
          <Input placeholder="speed" {...register("speed", { required: true })} />
          <Input placeholder="type" {...register("type", { required: true })} />
          <Input placeholder="version" {...register("version", { required: true })} />
          <Input placeholder="trigger" {...register("trigger")} />
          {/* Slot Form */}
          {slots.map((slot, index) => {
            return (
            <fieldset>
              {isAbility(slot) ?  
                <AbilityForm update={update} index={index} value={slot as Ability}/> : 
                <AttackForm update={update} index={index} value={slot as Attack}/>
              }
              
            </fieldset>
            )
          })
          }
          <Button 
          disabled={slots.length >= MAX_SLOTS}
          onClick={() => { slots.length < MAX_SLOTS && 
            append({
              effect: '',
              type: AbilityType.Static
            });
          }}>Add Ability</Button>
          <Button 
          disabled={slots.length >= MAX_SLOTS}
          onClick={() => { slots.length < MAX_SLOTS &&
            append({
              name: '',
              effect: ''
            } as Attack);
          }}>Add Attack</Button>
          <div className="flex gap-2">
            <Button type="submit">Create</Button>
          </div>
        </form>
      </CardContent>
    </Card>

  )
}
