import React from 'react';
import { Box } from '../common';
import { List, ListItem } from './Contacts.styled';

export const Contacts = ({ contacts, deleteContact }) => {
  return (
    <Box width="95%" mt="10px" pt="20px">
      {contacts.map(contact => {
        return (
          <List key={contact.id}>
            <ListItem>
              {`${contact.name}:`}
              <p> {contact.number} </p>
              <button onClick={() => deleteContact(contact.id)}>Delete</button>
            </ListItem>
          </List>
        );
      })}
    </Box>
  );
};
