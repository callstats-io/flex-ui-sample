import React from "react";
import * as Flex from "@twilio/flex-ui";

class App extends React.Component {
  render() {
    const { manager } = this.props;

    if (!manager) {
      return null;
    }
    Flex.Actions.addListener("afterAcceptTask", (payload) => {
      window.$callData = payload
    })

    return (
      <Flex.ContextProvider manager={manager}>
        <Flex.RootContainer />
      </Flex.ContextProvider>
    );
  }
}

export default App;
