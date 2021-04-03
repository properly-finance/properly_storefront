import React from "react";
import { Helmet } from "react-helmet";

interface ITitleSection {
  title: string;
};

const TitleSection: React.FC<ITitleSection> = ({ title }) => {
  return (
    <Helmet title={`${title}`} />
  );
};

export default TitleSection;