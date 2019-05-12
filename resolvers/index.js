
const resolvers = {
    Query: {
        allAuthors: (parent, args, {db}, info) => 
            db.collection('authors')
                .find()
                .toArray(),
    
        author: (parent, args, { db }, info) =>
            db.collection('authors')
                .findOne({ id: args.id }),
  
    
        allBooks: (parent, args, {db}, info) => 
            db.collection('books')
                .find()
                .toArray(),
    
        book: (parent, args, {db}, info) =>
            db.collection('books')
                .findOne({ id: args.id }),
    },

    Author: {
        books: (parent, args, {db}, info) =>
            db.collection('books')
            .find({author: parent.id})
            .toArray()
    },

    Book: {
        author: (parent, args, { db }, info) =>
            db.collection('authors')
            .findOne({ id: parent.author })
    }
}

module.exports = resolvers


