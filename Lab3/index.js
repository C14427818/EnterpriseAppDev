/**
 * Created by ORuairc on 26/02/2018.
 */

import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { createServer } from "http";
import postgraphile from "postgraphile";


const myGraphQLSchema = './dellstore2.sql';// ... define or import your schema here!

import typeDefs from './schema';
import resolvers from './resolvers';

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const app = express();
const graphqlEndpoint = '/graphql';

// bodyParser is needed just for POST.
app.use(graphqlEndpoint, bodyParser.json(), graphqlExpress({ schema }));

app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));

//**ON LOCALHOST:8080/graphiql**
app.listen(8080);
createServer(postgraphile());
