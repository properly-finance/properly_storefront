import React from "react";
import { Helmet } from "react-helmet";

interface IWindowTitle {
  title: string;
};

const WindowTitle: React.FC<IWindowTitle> = ({ title }) => {
  return (
    <Helmet title={`${title}`} />
  );
};

export default WindowTitle;