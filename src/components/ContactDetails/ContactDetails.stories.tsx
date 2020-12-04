import React from "react";

import { Meta, Story } from "@storybook/react";

import ContactDetails, { ContactDetailsProps } from ".";

export default {
  title: "ContactDetails",
  component: ContactDetails,
  excludeStories: /.*Data$/,
} as Meta;

export const contactDetailsData: ContactDetailsProps = {
  data: {
    address: {
      city: "Greenland",
      country: "Kenya",
      state: "Illinois",
      street: "125 Dimitri Shoals",
      zipCode: "84015-7936",
    },
    email: "Daphney_Boyer31@gmail.com",
    id: "1vNumQ__HE",
    jobTitle: "Forward Paradigm Technician",
    name: "Mckayla Kessler",
    phoneNumber: "1-841-054-3484",
  },
};

const Template: Story<ContactDetailsProps> = (args) => (
  <ContactDetails {...args} />
);

export const Default = Template.bind({});
Default.args = contactDetailsData;
