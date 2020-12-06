import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import { ContactDetailsProps } from "../ContactDetails";
import { siteDetailsData } from "./SiteDetails.stories";
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
  let container: (component: React.ReactElement) => React.ReactElement;
  let props: SiteDetailsProps;

  let onLinkClickMock: jest.Mock<SiteDetailsProps["onLinkClick"]>;

  beforeEach(() => {
    container = (component) => <MemoryRouter>{component}</MemoryRouter>;
    onLinkClickMock = jest.fn();
    props = { ...siteDetailsData, onLinkClick: onLinkClickMock };
  });

  test("renders site summary", () => {
    render(container(<SiteDetails {...props} />));
    const siteJSON = JSON.stringify(props.data);
    expect(screen.getByText(siteJSON)).toBeInTheDocument();
  });

  test("render images", () => {
    render(container(<SiteDetails {...props} />));

    const site = props.data!;
    site.images.forEach((src, i) => {
      const imageEl = screen.getByAltText(`${site.title} ${i + 1}`);
      expect(imageEl).toBeInTheDocument();
      expect(imageEl).toHaveAttribute("src", src);
    });
  });

  test("renders contact details", () => {
    render(container(<SiteDetails {...props} />));
    const contactJSON = JSON.stringify(props.data?.contact);
    expect(screen.getByText(contactJSON)).toBeInTheDocument();
  });

  test("renders spinner", () => {
    render(container(<SiteDetails {...props} isLoading={true} />));
    expect(screen.getByRole(/spinner/i)).toBeInTheDocument();
  });

  test("triggers back link click callback", () => {
    render(container(<SiteDetails {...props} />));
    const backButtonEl = screen.getByTitle(/go back/i);

    fireEvent.click(backButtonEl);

    expect(onLinkClickMock).toHaveBeenCalled();
    expect(onLinkClickMock.mock.calls[0][0]).toMatchObject({ type: "click" });
  });
});
