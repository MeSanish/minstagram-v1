import * as React from "react";
import { RouteComponentProps, Redirect, Route, RouteProps } from "react-router";
import { checkAuthentication } from "src/utils/auth";

interface IPublicRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<{}>>;
}

const PublicRoute: React.SFC<IPublicRouteProps> = ({
  component: Component,
  ...restProps
}) => (
  <Route
    {...restProps}
    render={(routeProps: RouteComponentProps<{}>) =>
      checkAuthentication() ? (
        <Redirect to="/" />
      ) : (
        <Component {...routeProps} />
      )
    }
  />
);

export default PublicRoute;
