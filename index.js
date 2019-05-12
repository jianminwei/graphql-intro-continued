const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const expressPlayground = require('graphql-playground-middleware-express').default

const fs = require('fs')
const authors = require("./data/authors")
const books = require("./data/books")

const typeDefs = fs.readFileSync('./typeDefs.graphql', 'UTF-8')

// const resolvers = require('./resolvers')
// const Query = require("./resolvers/Query");

const resolvers = {
    Query: {
        allAuthors: (parent, args, context, info) => {
            return authors
        },

        author(parent, args, context, info) {
            return authors.find(author => author.id === args.id);
        },

        allBooks: (parent, args, context, info) => {
            return books
        },

        book(parent, args, context, info) {
            return books.find(book => book.id === args.id);
        },
    },

    Author: {
        books(parent, args, context, info) {
            return books.filter(book => book.author === parent.id);
        },
    },

    Book: {
        author(parent, args, context, info) {
            let result = authors.filter(author => author.id === parent.author);

            //here we have to return a individual Author instead of a list.
            return result[0];
        },
    },    
};


const context = { books, authors }

// 2. Call `express()` to create an Express application
var app = express()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    engine: process.env.ENGINE_API_KEY ? true : false
});

// 3. Call `applyMiddleware()` to allow middleware mounted on the same path
server.applyMiddleware({ app })

// 4. Create a home route
app.get('/', (req, res) => res.end('Welcome to the PhotoShare API'))

// Add /playground route 
app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

// 5. Listen on a specific port
app.listen({ port: 4000 }, () =>
    console.log(`GraphQL Server running @http://localhost:4000${server.graphqlPath}`)
)