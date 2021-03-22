import React from "react";
import NotFoundPage from "@emmpair/pages/NotFoundPage";
import useNavigator from "@emmpair/hooks/useNavigator";

export const NotFound: React.FC = () => {
  const navigate = useNavigator();
  return <NotFoundPage onBack={() => navigate("/")} />;
};

export default NotFound;
