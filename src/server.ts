import express from 'express';
import cors from 'cors';
import {ApolloServer, gql, IResolvers} from 'apollo-server-express';
import {Users} from './types'

const app = express();

app.use(cors());

const users : Users = {
    '1': {id:1, userName: 'Holly Q'},
    '2': {id:2, userName: 'IO'}
}

const me = users[1]

const schema = gql`
    type User {
        id: ID!
        userName: String!
        firstName: String!
        lastName: String!
    }
    
    type Query {
        me: User
        users: [User!]
        user(id: ID!): User
    }
`;

const resolvers: IResolvers =  {
    Query: {
        me: () => me,
        users: () => Object.values(users),
        user: (parent, { id }) => users[id] || null,
    }
};

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 14141 }, () => {
    console.log('server on http://localhost:14141/graphql');
});