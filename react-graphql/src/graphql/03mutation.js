// eslint-disable-next-line no-unused-vars
import react, { Component } from "react";
import { ApolloProvider, Mutation } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

// 创建客户端连接
const client = new ApolloClient({
  // uri: "http://localhost:3003/graphql",
  uri: "/graphql",
});

class App extends Component {
  // 也可以把state写在这里
  state = {
    a: 123,
  };
  add = () => {
    this.setState({
      a: this.state.a + 1,
    });
  };
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <CreateComponent></CreateComponent>
        </div>
      </ApolloProvider>
    );
  }
}

class CreateComponent extends Component {
  createFilm = gql`
    mutation createFilm($input: FilmInput) {
      createFilm(filmInput: $input) {
        id,
        name,
        price,
      }
    }
  `;
  addItem = (createFilm) => {
    createFilm({
      variables: {
        input: {
          name: "test",
          price: 200,
          poster: "http://test",
        },
      },
    });
  };

  render() {
    return (
      <Mutation mutation={this.createFilm}>
        {(createFilm, { loading, error, data }) => {
          return (
            <div>
              <button onClick={() => this.addItem(createFilm)}>
                add
              </button>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default App;
