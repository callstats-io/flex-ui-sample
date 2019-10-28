import React from "react";
import * as Flex from "@twilio/flex-ui";

class App extends React.Component {
  componentDidMount () {
    const APP_ID = window._env_.REACT_APP_ID 
    const APP_SECRET = window._env_.REACT_APP_SECRET 
    const userName = this.props.manager.workerClient.attributes.full_name

    window.callStats.initialize(APP_ID, APP_SECRET, userName)
    window.callStats.on('preCallTestResults', window.preCallTestResultsCallback)
    setInterval(() => window.callStats.makePrecallTest(), 120000)
  }
  render() {
    const { manager } = this.props;

    if (!manager) {
      return null;
    }
    Flex.Actions.addListener("afterAcceptTask", (payload) => {
      window.$callData = payload
    })
    Flex.Actions.addListener("afterHangupCall", () => {
      window.CallstatsJabraShim.stopJabraMonitoring()
    })
    Flex.Actions.addListener("afterCompleteTask", () => {
      window.CallstatsJabraShim.stopJabraMonitoring()
    })

    return (
      <Flex.ContextProvider manager={manager}>
        <Flex.RootContainer />
      </Flex.ContextProvider>
    );
  }
}

export default App;
