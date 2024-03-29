const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const expressPlayground = require('graphql-playground-middleware-express').default
const { MongoClient } = require('mongodb')
require('dotenv').config()

const fs = require('fs')
const typeDefs = fs.readFileSync('./typeDefs.graphql', 'UTF-8')

const resolvers = require('./resolvers')

// 1. Create Asynchronous Function
async function start() {
    const app = express()
    const MONGO_DB = process.env.DB_HOST
    const client = await MongoClient.connect(
        MONGO_DB,
        { useNewUrlParser: true }
    )

    const db = client.db()
    const context = { db }
    const server = new ApolloServer({ typeDefs, resolvers, context })

    server.applyMiddleware({ app })
    app.get('/', (req, res) => res.end('Welcome to the PhotoShare API'))
    app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

    app.listen({ port: 4000 }, () =>
        console.log(
            `GraphQL Server running at http://localhost:4000${server.graphqlPath}`
        )
    )
}

// 5. Invoke start when ready to start
start()