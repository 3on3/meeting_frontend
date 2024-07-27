import React, { useState } from 'react';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

const RadioButtonGroup = () => {
  const [value, setValue] = useState('1번');

  return (
    <div>
      <div>RadioButton</div>
      <RadioGroup label="Radio Button" name="radioGroup" value={value} onChange={setValue}>
        <Radio value="1번"> 과팅1</Radio>
        <Radio value="2번"> 과팅2</Radio>
        <Radio value="3번"> 과팅3</Radio>
      </RadioGroup>
    </div>
  );
};

export default RadioButtonGroup;
