
const resolvers = {
    Query: {
        allAuthors: (parent, args, {authors}, info) => {
            return authors
        },
    
        author(parent, args, {authors}, info) {
            return authors.find(author => author.id === args.id);
        },
    
        allBooks: (parent, args, {books}, info) => {
            return books
        },
    
        book(parent, args, {books}, info) {
            return books.find(book => book.id === args.id);
        },
    },

    Author: {
        books(parent, args, {books}, info) {
            return books.filter(book => book.author === parent.id);
        }
    },

    Book: {
        author(parent, args, {authors}, info) {
            let result = authors.filter(author => author.id === parent.author);
    
            //here we have to return a individual Author instead of a list.
            return result[0];
        },
    }
}

module.exports = resolvers


