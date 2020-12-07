import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import { siteListData } from "./SiteList.stories";
import { SiteListProps } from "./SiteList";
import { SiteSummaryProps } from "../SiteSummary";
import SiteList from "./";

const SiteSummaryMock: React.FC<SiteSummaryProps> = ({ data }) => {
  return (
    <div test-id={`site-summary-mock-${data.id}`}>{JSON.stringify(data)}</div>
  );
};

jest.mock("../SiteSummary", () => SiteSummaryMock);

describe("<SiteList />", () => {
  let container: (component: React.ReactElement) => React.ReactElement;
  let props: SiteListProps;

  let onLinkClickMock: jest.Mock<SiteListProps["onLinkClick"]>;
  let onLoadMock: Required<SiteListProps>["onLoad"];

  beforeEach(() => {
    container = (component) => <MemoryRouter>{component}</MemoryRouter>;
    onLinkClickMock = jest.fn();
    onLoadMock = jest.fn();
    props = {
      ...siteListData,
      onLinkClick: onLinkClickMock,
      onLoad: onLoadMock,
    };
  });

  test("renders site summaries", () => {
    render(container(<SiteList {...props} />));
    siteListData.data.forEach((site) => {
      const siteJSON = JSON.stringify(site);
      expect(screen.getByText(siteJSON)).toBeInTheDocument();
    });
  });

  test("renders spinner", () => {
    render(container(<SiteList {...props} isLoading={true} />));
    expect(screen.getByRole(/spinner/i)).toBeInTheDocument();
  });

  test("renders end of the list message", () => {
    render(container(<SiteList {...props} hasMore={false} />));
    const messageEl = screen.getByText(/you reached the end of the list/i);
    expect(messageEl).toBeInTheDocument();
  });

  test("renders empty list message", () => {
    render(container(<SiteList {...props} data={[]} hasMore={false} />));
    const messageEl = screen.getByText(/there are no sites to be found/i);
    expect(messageEl).toBeInTheDocument();
  });

  test("triggers link click callback", () => {
    render(container(<SiteList {...props} />));
    const site = siteListData.data[1];
    const siteJSON = JSON.stringify(site);
    const summaryEl = screen.getByText(siteJSON);

    fireEvent.click(summaryEl);

    expect(onLinkClickMock).toHaveBeenCalled();
    expect(onLinkClickMock.mock.calls[0][0]).toMatchObject({ type: "click" });
    expect(onLinkClickMock.mock.calls[0][1]).toEqual(site.id);
  });

  test("triggers load more callback", () => {
    render(container(<SiteList {...props} />));
    const loadMoreButtonEl = screen.getByText(/load more/i);
    fireEvent.click(loadMoreButtonEl);
    expect(onLoadMock).toHaveBeenCalled();
  });

  describe("with error", () => {
    beforeEach(() => {
      render(container(<SiteList {...props} data={[]} hasError={true} />));
    });

    test("renders message", () => {
      const messageEl = screen.getByText(/an unexpected error has occurred/i);
      expect(messageEl).toBeInTheDocument();
    });

    test("renders try again button", () => {
      expect(screen.getByText(/try again/i)).toBeInTheDocument();
    });

    test("triggers try again callback", () => {
      const tryAgainButtonEl = screen.getByText(/try again/i);
      fireEvent.click(tryAgainButtonEl);
      expect(onLoadMock).toHaveBeenCalled();
    });
  });
});
