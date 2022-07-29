import React from 'react';
import { List, Datagrid, TextField, DeleteButton, EditButton } from 'react-admin';

function WordList() {
  return (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="word" />
            <DeleteButton />
            <EditButton />
        </Datagrid>
    </List>
  );
}

export default WordList