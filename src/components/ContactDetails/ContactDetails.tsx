import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import PersonIcon from "@material-ui/icons/Person";
import PlaceIcon from "@material-ui/icons/Place";
import PhoneIcon from "@material-ui/icons/Phone";

import { formatAddress } from "../../helpers/address.helper";
import ContactData from "../../data-types/contact-data";

export interface ContactDetailsProps {
  data: ContactData;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ data }) => {
  return (
    <div className="ContactDetails">
      <List>
        <ListItem>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText
            primary={data.name}
            secondary={data.jobTitle}
          ></ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PhoneIcon />
          </ListItemIcon>
          <ListItemText primary={data.phoneNumber}></ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary={data.email}></ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PlaceIcon />
          </ListItemIcon>
          <ListItemText primary={formatAddress(data.address)}></ListItemText>
        </ListItem>
      </List>
    </div>
  );
};

export default ContactDetails;
