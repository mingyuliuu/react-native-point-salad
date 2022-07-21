import React from "react";
import Routes from "./Routes";
import { Authentication } from "./Authentication";

const Providers = () => {
  return (
    <Authentication>
      <Routes />
    </Authentication>
  );
};

export default Providers;
