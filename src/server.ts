import express from 'express';
import cors from 'cors';
import {ApolloServer, gql} from 'apollo-server-express';

const app = express();

app.use(cors());

const schema = gql`
    type User {
        userName: String!
    }
    
    type Query {
        me: User
    }
`;

const resolvers =  {
    Query: {
        me: () => ({userName: 'Holly Q'})
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