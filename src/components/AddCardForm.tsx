import { Card as TradingCard, db } from "../db"
import { useForm, SubmitHandler } from "react-hook-form"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export const AddCardForm = () => {

  async function addCard(card: TradingCard) {
    try {
      // Add the new friend!
      const id = await db.cards.add({...card })

    } catch (error) {
      window.alert(`oop: ${error}`)
    }
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TradingCard>()
  const onSubmit: SubmitHandler<TradingCard> = addCard

  console.log(watch("name"))

  return (
    <Card className="w-full sm:max-w-md">
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input defaultValue="CrabGirl" {...register("name", { required: true })} />
          <Input {...register("level", { required: true })} />
          <Input {...register("hp", { required: true })} />
          <Input {...register("attack", { required: true })} />
          <Input {...register("speed", { required: true })} />
          <Input {...register("type", { required: true })} />
          <Input {...register("version", { required: true })} />
          <Input {...register("trigger")} />
          {/* todo: slot sub-form */}
          <div className="flex gap-2">
            <Button type="submit">Create</Button>
          </div>
        </form>
      </CardContent>
    </Card>

  )
}
