import React from "react";
import { render, screen } from "@testing-library/react";

import { contactDetailsData } from "./ContactDetails.stories";
import { ContactDetailsProps } from "./ContactDetails";
import ContactDetails from "./";

describe("<ContactDetails />", () => {
  const contact = contactDetailsData.data;

  beforeEach(() => {
    render(<ContactDetails {...contactDetailsData} />);
  });

  test("renders name", () => {
    expect(screen.getByText(contact.name)).toBeInTheDocument();
  });

  test("renders job title", () => {
    expect(screen.getByText(contact.jobTitle)).toBeInTheDocument();
  });

  test("renders phone", () => {
    expect(screen.getByText(contact.phoneNumber)).toBeInTheDocument();
  });

  test("renders email", () => {
    expect(screen.getByText(contact.email)).toBeInTheDocument();
  });

  test("renders address", () => {
    const { address } = contact;

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
