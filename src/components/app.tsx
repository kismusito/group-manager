import { Provider } from "react-redux";
import { store } from "store";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./private-route";

// Screens
import { Login } from "screens/views/login";
import { Dashboard } from "screens/views/dashboard";
import { Modal } from "screens/ui/modal";
import { GlobalStyle } from "utils/style/global-style";

export const App = () => {
  return (
    <Provider store={store}>
      <Modal />
      <GlobalStyle />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<p>not found</p>} />
        </Routes>
      </Router>
    </Provider>
  );
};
