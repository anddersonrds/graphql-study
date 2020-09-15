const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  scalar Date

  type User {
    id: ID
    name: String!
    email: String!
    age: Int
    salary: Float
    vip: Boolean
  }

  type Query {
    hi: String
    currentHour: Date
    userLogged: User
  }
`;

const resolvers = {
  User: {
    salary(user) {
      return user.real_salary
    }
  },
  Query: {
    hi() {
      return "Bom dia!!"
    },
    currentHour() {
      return new Date().toString()
    },
    userLogged(obj) {
      console.log(obj)
      return {
        id: 1,
        name: 'Anderson Rodrigues',
        email: 'anddersonrds@gmail.com',
        age: 30,
        real_salary: 1200.00,
        vip: true
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Executando em ${url}`);
});
