import React from "react";
import * as Flex from "@twilio/flex-ui";

class App extends React.Component {
  componentDidMount () {
    const APP_ID = window.$APP_ID
    const APP_SECRET = window.$APP_SECRET
    const userName = this.props.manager.workerClient.attributes.full_name

    const script = document.createElement("script");
    script.type = 'text/javascript';
    script.innerHTML = "callStats.initialize('" + APP_ID + "', '" + APP_SECRET + "', '" + userName + "');";
    script.async = true;

    document.body.appendChild(script);
  }
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
