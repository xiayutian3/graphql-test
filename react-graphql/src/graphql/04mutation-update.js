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
          <UpdateComponent></UpdateComponent>
        </div>
      </ApolloProvider>
    );
  }
}

class UpdateComponent extends Component {
  updateFilm = gql`
    mutation updateFilm($id: String!, $input: FilmInput) {
      updateFilm(id: $id, filmInput: $input) {
        id,
        name,
        price
      }
    }
  `;
  addItem = (updateFilm) => {
    updateFilm({
      variables: {
        id: "6497accb4632bc1f3e4b9ecc",
        input: {
          name: "test-修改",
          price: 200,
          poster: "http://test-修改",
        },
      },
    });
  };

  render() {
    return (
      <Mutation mutation={this.updateFilm}>
        {(updateFilm, { loading, error, data }) => {
          return (
            <div>
              <button onClick={() => this.addItem(updateFilm)}>更新</button>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default App;
