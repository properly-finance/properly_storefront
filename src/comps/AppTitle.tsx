import React from "react";
import { Helmet } from "react-helmet";

interface IAppTitle {
  title: string;
};

const AppTitle: React.FC<IAppTitle> = ({ title }) => {
  return (
    <Helmet title={`${title}`} />
  );
};

export default AppTitle;