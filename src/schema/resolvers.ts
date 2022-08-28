import { builder } from '../builder'

import { DogObjectType, DogObjectInput } from './typeDefs'

builder.queryField('getDogs', (t) =>
  t.field({
    type: [DogObjectType],
    resolve: async (root, args, ctx) => {
      return await ctx.db.selectFrom('dog').selectAll().execute()
    }
  })
)

builder.queryField('getDog', (t) =>
  t.field({
    type: DogObjectType,
    args: {
      id: t.arg.int({ required: true })
    },
    resolve: async (root, args, ctx) => {
      return await ctx.db.selectFrom('dog').selectAll().where('id', '=', args.id).executeTakeFirstOrThrow()
    }
  })
)

builder.mutationField('createDog', (t) =>
  t.field({
    type: DogObjectType,
    args: {
      input: t.arg({
        type: DogObjectInput,
        required: true
      })
    },
    resolve: async (root, args, ctx) => {
      return await ctx.db.insertInto('dog').values({
        name: args.input.name,
        breed: args.input.breed
      }).returningAll().executeTakeFirstOrThrow()
    }
  })
)

builder.mutationField('updateDog', (t) =>
  t.field({
    type: DogObjectType,
    args: {
      input: t.arg({
        type: DogObjectInput,
        required: true
      })
    },
    resolve: async (root, args, ctx) => {
      const data = {
        id: args.input.id as number,
        name: args.input.name,
        breed: args.input.breed
      }
      return await ctx.db.insertInto('dog').values(data)
        .onConflict((oc) => oc.column('id').doUpdateSet(data))
        .returningAll().executeTakeFirstOrThrow()
    }
  })
)

builder.mutationField('removeDog', (t) =>
  t.field({
    type: DogObjectType,
    args: {
      id: t.arg.int({ required: true })
    },
    resolve: async (root, args, ctx) => {
      return await ctx.db.deleteFrom('dog').where('id', '=', args.id).returningAll().executeTakeFirstOrThrow()
    }
  })
)
