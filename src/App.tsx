import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { ChannelPage } from "./components/channelPage/ChannelPage";
import { HomePage } from "./components/homePage/HomePage";
import history from "./helpers/history";

function App() {
    return (
        <div className="App">
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/:uuid" component={ChannelPage} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
