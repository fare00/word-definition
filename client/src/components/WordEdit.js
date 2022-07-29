import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';


function WordCreate(props) {
  return (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source='id' disabled />
            <TextInput source='word' required />
            <TextInput source='sentence' required />
            <TextInput source='definition' required multiline />
        </SimpleForm>
    </Edit>
  )
}

export default WordCreate