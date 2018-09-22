import React from 'react';
import { Form, Field, Checkbox } from 'semantic-ui-react';

const ToggleBox = ({ type = 'checkbox', name, checked, onChange, label }) => (
  <Form.Field defaultChecked={true} checked={checked} name={name} control={Checkbox} onChange={onChange} label={{ children: label }} />
);

export default ToggleBox;