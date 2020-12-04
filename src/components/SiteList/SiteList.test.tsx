import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { siteListActionData, siteListData } from "./SiteList.stories";
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

  test("renders site summaries", () => {
    siteListData.data.forEach((site) => {
      const siteJSON = JSON.stringify(site);
      expect(screen.getByText(siteJSON)).toBeInTheDocument();
    });
  });

  test("triggers click item callback", () => {
    const site = siteListData.data[1];
    const siteJSON = JSON.stringify(site);
    const summaryEl = screen.getByText(siteJSON);

    fireEvent.click(summaryEl);

    expect(onClickItemMock).toHaveBeenCalledWith(site.id);
  });
});
