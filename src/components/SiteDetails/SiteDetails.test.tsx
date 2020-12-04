import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { ContactDetailsProps } from "../ContactDetails";
import { siteDetailsActionData, siteDetailsData } from "./SiteDetails.stories";
import { SiteDetailsProps } from "./SiteDetails";
import { SiteSummaryProps } from "../SiteSummary";
import SiteDetails from "./";

const ContactDetailsMock: React.FC<ContactDetailsProps> = ({ data }) => {
  return <div test-id="contact-details-mock">{JSON.stringify(data)}</div>;
};

const SiteSummaryMock: React.FC<SiteSummaryProps> = ({ data }) => {
  return (
    <div test-id={`site-summary-mock-${data.id}`}>{JSON.stringify(data)}</div>
  );
};

jest.mock("../ContactDetails", () => ContactDetailsMock);
jest.mock("../SiteSummary", () => SiteSummaryMock);

describe("<SiteDetails />", () => {
  const site = siteDetailsData.data;

  let onBackButtonClickMock: SiteDetailsProps["onBackButtonClick"];

  beforeEach(() => {
    onBackButtonClickMock = jest.fn();
    render(
      <SiteDetails
        {...siteDetailsData}
        {...siteDetailsActionData}
        onBackButtonClick={onBackButtonClickMock}
      />
    );
  });

  test("renders site summary", () => {
    const siteJSON = JSON.stringify(site);
    expect(screen.getByText(siteJSON)).toBeInTheDocument();
  });

  test("render images", () => {
    site.images.forEach((src, i) => {
      const imageEl = screen.getByAltText(`${site.title} ${i + 1}`);
      expect(imageEl).toBeInTheDocument();
      expect(imageEl).toHaveAttribute("src", src);
    });
  });

  test("renders contact details", () => {
    const contactJSON = JSON.stringify(site.contact);
    expect(screen.getByText(contactJSON)).toBeInTheDocument();
  });

  test("triggers back button click", () => {
    const goBackButtonEl = screen.getByTitle("Go back");

    fireEvent.click(goBackButtonEl);

    expect(onBackButtonClickMock).toHaveBeenCalled();
  });
});
