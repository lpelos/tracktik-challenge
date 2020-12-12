import React from "react";
import { render, screen } from "@testing-library/react";

import AppToolbar, { AppToolbarProps } from "./AppToolbar";
import USER_DATA from "../../__fixtures__/user-data.fixture";

describe("<AppToolbar />", () => {
  const user = USER_DATA;

  let props: AppToolbarProps;

  beforeEach(() => {
    props = { isLoadingUser: false, user };
  });

  test("renders title", () => {
    render(<AppToolbar {...props} />);
    expect(screen.getByText(/scheduling/i)).toBeInTheDocument();
  });

  describe("user", () => {
    test("renders avatar", () => {
      render(<AppToolbar {...props} />);
      const avatarEl = screen.getByRole("avatar");
      expect(avatarEl).toBeInTheDocument();
      expect(avatarEl).toHaveAttribute("title", user.name);
    });

    test("renders spinner", () => {
      render(<AppToolbar {...props} isLoadingUser={true} user={undefined} />);
      expect(screen.getByRole("spinner")).toBeInTheDocument();
    });
  });
});
