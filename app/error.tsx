"use client";

import React, { useEffect } from "react";
import EmptyState from "./components/shared/EmptyState";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState title="Uh Oh" subTitle="Something went wrong!"></EmptyState>
  );
};

export default ErrorState;
