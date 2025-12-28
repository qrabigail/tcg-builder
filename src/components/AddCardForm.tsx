import { Ability, AbilityType, Attack, Card as TradingCard, db } from "../db"
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form"
import { Card, CardContent, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { AbilityForm } from "./AbilityForm"
import { AttackForm } from "./AttackForm"
import { Textarea } from "./ui/textarea"
import { Trash } from "lucide-react"
import { isAbility } from "../helpers/isAbility"
import { convert2NileFmt } from "../helpers/conversions"

const MAX_SLOTS = 3

export const AddCardForm = () => {

  async function addCard(card: TradingCard) {
    try {
      // Add the new card!
      await db.cards.add({...card })
      console.log(JSON.stringify(convert2NileFmt(card), null, 2))

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

    const { fields: slots, update, append, remove } = useFieldArray({
    control,
    name: "slots"
  });
  const onSubmit: SubmitHandler<TradingCard> = addCard
  console.log(watch("slots.0.type"))

  return (
    <Card className="max-w-3xl m-4">
      <CardTitle className="p-4">Create a Card</CardTitle>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="name" {...register("name", { required: true })} />
            <Input placeholder="art" {...register("art")} />

            <Input className="" placeholder="speed" {...register("speed", { required: true })} />
            <Input className="" placeholder="level" {...register("level", { required: true })} />

            <Input className="" placeholder="type" {...register("type", { required: true })} />
            <Input className="" placeholder="HP" {...register("hp", { required: true })} />

            <Input className="" placeholder="attack" {...register("attack")} />
            <Input placeholder="version" {...register("version", { required: true })} />
            <Textarea aria-multiline defaultValue={undefined} className="col-span-2" placeholder="trigger" {...register("trigger")} />
          </div>

          {/* Slot Form */}
          {slots.map((slot, index) => {
            return (
              <div className="grid grid-cols-12" key={`slot-${index}`}>
                <Trash className="rounded-full p-1 border-red-300 text-red-700 bg-red-50 hover:bg-red-100 hover:border-red-400" onClick={() => remove(index)}/>
                <fieldset className="col-span-11" >
                  {isAbility(slot) ?  
                    <AbilityForm update={update} register={register} index={index} value={slot as Ability}/> : 
                    <AttackForm register={register} index={index} value={slot as Attack}/>
                  }
                  
                </fieldset>
              </div>

            )
          })
          }
          <div className="grid grid-cols-2 gap-2">
            <Button 
              type="button"
              disabled={slots.length >= MAX_SLOTS}
              onClick={() => { slots.length < MAX_SLOTS && 
                append({
                  effect: '',
                  type: AbilityType.Static
                });
              }}
              >
                Add Ability
            </Button>
            <Button 
              type="button"
              disabled={slots.length >= MAX_SLOTS}
              onClick={() => { slots.length < MAX_SLOTS &&
                append({
                  name: '',
                  effect: '',
                } as Attack);
              }}>
                Add Attack
            </Button>
            <Button className="col-span-2" type="submit">Create</Button>
          </div>
        </form>
      </CardContent>
    </Card>

  )
}
