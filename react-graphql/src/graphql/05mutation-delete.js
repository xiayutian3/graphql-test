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
          <DeleteComponent></DeleteComponent>
        </div>
      </ApolloProvider>
    );
  }
}

class DeleteComponent extends Component {
  deleteFilm = gql`
    mutation deleteFilm($id: String!) {
      deleteFilm(id: $id)
    }
  `;
  addItem = (deleteFilm) => {
    deleteFilm({
      variables: {
        id: "6497acbb4632bc1f3e4b9eca",
      },
    });
  };

  render() {
    return (
      <Mutation mutation={this.deleteFilm}>
        {(deleteFilm, { loading, error, data }) => {
          return (
            <div>
              <button onClick={() => this.addItem(deleteFilm)}>删除数据</button>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default App;
