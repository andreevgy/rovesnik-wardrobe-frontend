import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginNumber from "./scenes/LoginNumber";
import ActiveNumber from "./scenes/ActiveNumber";
import { Auth0Provider } from "@auth0/auth0-react";
import Logout from "./scenes/Logout";
import FaqPage from "./scenes/FaqPage";

function App() {
  return (
      <Auth0Provider
          domain="dev-q8akwcea.us.auth0.com"
          clientId="MJDywEXt5zgMe2noOEpcIg6v4r7TYpWA"
          redirectUri={window.location.origin}
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
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/faq">
              <FaqPage />
            </Route>
          </Switch>
        </Router>
      </Auth0Provider>
  );
}

export default App;
