import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { siteListActionData, siteListData } from "./SiteList.stories";
import { SiteListProps } from "./SiteList";
import SiteList from "./";

describe("<SiteList />", () => {
  let onClickItemMock: SiteListProps["onClickItem"];

  beforeEach(() => {
    onClickItemMock = jest.fn();
    render(
      <SiteList
        {...siteListData}
        {...siteListActionData}
        onClickItem={onClickItemMock}
      />
    );
  });

  test("renders titles", () => {
    siteListData.data.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  test("renders addresses", () => {
    siteListData.data.forEach(({ address }) => {
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
  });

  test("renders contact names", () => {
    siteListData.data.forEach(({ contact }) => {
      expect(screen.getByText(contact.name)).toBeInTheDocument();
    });
  });

  test("renders first image", () => {
    siteListData.data.forEach(({ images, title }) => {
      const imageEl = screen.getByAltText(`${title} avatar`);
      expect(imageEl.getAttribute('src')).toBe(images[0]);
    });
  });

  test("triggers click item callback", () => {
    const { id, title } = siteListData.data[1];
    const titleEl = screen.getByText(title);

    fireEvent.click(titleEl);

    expect(onClickItemMock).toHaveBeenCalledWith(id);
  });
});
