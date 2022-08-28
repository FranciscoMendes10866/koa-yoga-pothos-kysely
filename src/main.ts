import Koa from 'koa'
import { createServer } from '@graphql-yoga/node'

import { schema } from './schema'
import { Context } from './builder'
import { db } from './db'

const app = new Koa()

const graphQLServer = createServer<Koa.ParameterizedContext>({
  schema,
  context: (): Context => ({ db })
})

app.use(async (ctx) => {
  const response = await graphQLServer.handleIncomingMessage(ctx.req, ctx)
  ctx.status = response.status
  response.headers.forEach((value, key) => {
    ctx.append(key, value)
  })
  ctx.body = response.body
})

app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql')
})
