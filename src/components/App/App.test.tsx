import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./";

const AppNavigationMock: React.FC = () => {
  return <div test-id="app-navigation-mock"></div>;
};

jest.mock("../AppNavigation", () => AppNavigationMock);

describe("<App />", () => {
  test("renders topbar title", () => {
    render(<App />);
    expect(screen.getByText(/scheduling/i)).toBeTruthy();
  });
});
