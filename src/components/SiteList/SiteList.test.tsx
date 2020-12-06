import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

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
  let props: SiteListProps;

  let onLoadMock: SiteListProps["onLoad"];
  let onClickItemMock: SiteListProps["onClickItem"];

  beforeEach(() => {
    onClickItemMock = jest.fn();
    onLoadMock = jest.fn();

    props = {
      ...siteListData,
      onClickItem: onClickItemMock,
      onLoad: onLoadMock,
    };
  });

  test("renders site summaries", () => {
    render(<SiteList {...props} />);
    siteListData.data.forEach((site) => {
      const siteJSON = JSON.stringify(site);
      expect(screen.getByText(siteJSON)).toBeInTheDocument();
    });
  });

  test("renders spinner", () => {
    render(<SiteList {...props} isLoading={true} />);
    expect(screen.getByRole(/spinner/i)).toBeInTheDocument();
  });

  test("renders end of the list message", () => {
    render(<SiteList {...props} hasMore={false} />);
    const messageEl = screen.getByText(/you reached the end of the list/i);
    expect(messageEl).toBeInTheDocument();
  });

  test("renders empty list message", () => {
    render(<SiteList {...props} data={[]} hasMore={false} />);
    const messageEl = screen.getByText(/there are no sites to be found/i);
    expect(messageEl).toBeInTheDocument();
  });

  test("triggers click item callback", () => {
    render(<SiteList {...props} />);
    const site = siteListData.data[1];
    const siteJSON = JSON.stringify(site);
    const summaryEl = screen.getByText(siteJSON);

    fireEvent.click(summaryEl);

    expect(onClickItemMock).toHaveBeenCalledWith(site.id);
  });

  test("triggers load more callback", () => {
    render(<SiteList {...props} />);
    const loadMoreButtonEl = screen.getByText(/load more/i);
    fireEvent.click(loadMoreButtonEl);
    expect(onLoadMock).toHaveBeenCalled();
  });

  describe("with error", () => {
    beforeEach(() => {
      render(<SiteList {...props} data={[]} hasError={true} />);
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
