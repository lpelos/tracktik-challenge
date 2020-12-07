import React from "react";

import { Meta, Story } from "@storybook/react";

import CONTACT_DATA from "../../__fixtures__/contact-data.fixture";
import ContactDetails, { ContactDetailsProps } from ".";

export default {
  title: "ContactDetails",
  component: ContactDetails,
  excludeStories: /.*Data$/,
} as Meta;

export const contactDetailsData: ContactDetailsProps = {
  data: CONTACT_DATA,
};

const Template: Story<ContactDetailsProps> = (args) => (
  <ContactDetails {...args} />
);

export const Default = Template.bind({});
Default.args = contactDetailsData;
