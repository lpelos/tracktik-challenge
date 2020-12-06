import React from "react";
import { render } from "@testing-library/react";

import App from "./";

const AppNavigationMock: React.FC = () => {
  return <div test-id="app-navigation-mock"></div>;
};

jest.mock("../AppNavigation", () => AppNavigationMock);

describe("<App />", () => {
  test("renders without crashing", () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });
});
