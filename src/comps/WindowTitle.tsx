import React from "react";
import { Helmet } from "react-helmet";

interface IWindowTitleProps {
  title: string;
};

const WindowTitle: React.FC<IWindowTitleProps> = ({ title }) => {
  return (
    <Helmet title={`${title}`} />
  );
};

export default WindowTitle;