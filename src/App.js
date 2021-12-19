import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginNumber from "./scenes/LoginNumber";
import ActiveNumber from "./scenes/ActiveNumber";
import { Auth0Provider } from "@auth0/auth0-react";
import FaqPage from "./scenes/FaqPage";
import IndexPage from "./scenes/IndexPage";

function App() {
  return (
      <Auth0Provider
          domain="dev-q8akwcea.us.auth0.com"
          clientId="MJDywEXt5zgMe2noOEpcIg6v4r7TYpWA"
          redirectUri={window.location.origin}
          cacheLocation="localstorage"
          audience="rovesnik-wardrobe-api"
          scope="read:current_code take:number_self"
      >
        <Router>
          <Switch>
            <Route path="/activeNumber">
              <ActiveNumber />
            </Route>
            <Route path="/loginNumber">
              <LoginNumber />
            </Route>
            <Route path="/faq">
              <FaqPage />
            </Route>
            <Route exact path="/">
              <IndexPage />
            </Route>
          </Switch>
        </Router>
      </Auth0Provider>
  );
}

export default App;
