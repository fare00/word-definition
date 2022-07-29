import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';


function WordCreate(props) {
  return (
    <Create {...props}>
        <SimpleForm>
            <TextInput source='word' required />
            <TextInput source='sentence' required />
            <TextInput source='definition' required />
        </SimpleForm>
    </Create>
  )
}

export default WordCreate