import React from "react";
import { Route, RouteProps } from "react-router-dom";
import NotFound from "@emmpair/comps/NotFound";
// import useUser from "@emmpair/hooks/useUser";
import { PermissionEnum } from "@emmpair/enums";
// import { hasPermission } from "@emmpair/utils";

interface ISectionRouteProps extends RouteProps {
  permissions?: PermissionEnum[];
}

export const SectionRoute: React.FC<ISectionRouteProps> = ({
  permissions,
  ...props
}) => {
  // const { user } = useUser();
  // const hasPermissions = !permissions 
  //   || permissions
  //     .map(permission => hasPermission(permission, user))
  //     .reduce((prev, curr) => prev && curr);
  const hasPermissions = true;

  return hasPermissions 
    ? <Route {...props} />
    : <NotFound />;
};

SectionRoute.displayName = "Route";
export default SectionRoute;
