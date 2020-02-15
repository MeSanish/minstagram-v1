import * as React from "react";
import { RouteComponentProps, Route, RouteProps } from "react-router";
import { checkAuthentication, handleLogout } from "src/utils/auth";

interface IPrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<{}>>;
}

const RedirectToLogout: React.SFC<{}> = () => {
  handleLogout();
  return <React.Fragment />;
};

const PrivateRoute: React.SFC<IPrivateRouteProps> = ({
  component: Component,
  ...restProps
}) => (
  <Route
    {...restProps}
    render={(routeProps: RouteComponentProps<{}>) =>
      checkAuthentication() ? (
        <Component {...routeProps} />
      ) : (
        <RedirectToLogout />
      )
    }
  />
);

export default PrivateRoute;
