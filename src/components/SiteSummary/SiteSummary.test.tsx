import React from "react";
import { render, screen } from "@testing-library/react";

import { siteSummaryData } from "./SiteSummary.stories";
import SiteSummary from "./";

describe("<SiteSummary />", () => {
  const site = siteSummaryData.data;

  describe("default", () => {
    beforeEach(() => {
      render(<SiteSummary {...siteSummaryData} />);
    });

    test("renders avatar", () => {
      const { images, title } = site;
      const imageEl = screen.getByAltText(`${title} avatar`);
      expect(imageEl.getAttribute("src")).toBe(images[0]);
    });

    test("renders title", () => {
      expect(screen.getByText(site.title)).toBeInTheDocument();
    });

    test("renders address", () => {
      const { address } = site;

      const cityEl = screen.getByText(new RegExp(address.city));
      expect(cityEl).toBeInTheDocument();

      const countryEl = screen.getByText(new RegExp(address.country));
      expect(countryEl).toBeInTheDocument();

      const stateEl = screen.getByText(new RegExp(address.state));
      expect(stateEl).toBeInTheDocument();

      const streetEl = screen.getByText(new RegExp(address.street));
      expect(streetEl).toBeInTheDocument();

      const zipCodeEl = screen.getByText(new RegExp(address.zipCode));
      expect(zipCodeEl).toBeInTheDocument();
    });

    test("renders contact name", () => {
      const { contact } = site;
      expect(screen.getByText(contact.name)).toBeInTheDocument();
    });
  });

  describe("dark", () => {
    beforeEach(() => {
      render(<SiteSummary {...siteSummaryData} dark={true} />);
    });

    test("title is white", () => {
      expect(screen.getByRole("text-box")).toHaveStyle({ color: "white" });
    });
  });
});
