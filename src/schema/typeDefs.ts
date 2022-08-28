import { builder } from '../builder'

export const DogObjectType = builder.simpleObject('CreateDogResponse', {
  fields: (t) => ({
    id: t.id(),
    name: t.string(),
    breed: t.string()
  })
})

export const DogObjectInput = builder.inputType('DogObjectInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
    breed: t.string({ required: true }),
    id: t.int()
  })
})
