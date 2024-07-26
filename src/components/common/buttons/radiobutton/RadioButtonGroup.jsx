import React, { useState } from 'react';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

const RadioButtonGroup = () => {
  const [value, setValue] = useState('1번');

  return (
    <div>
      <div>RadioButton</div>
      <RadioGroup label="Radio Button" value={value} onChange={setValue}>
        <Radio value="1번">1번</Radio>
        <Radio value="2번">2번</Radio>
        <Radio value="3번">3번</Radio>
      </RadioGroup>
    </div>
  );
};

export default RadioButtonGroup;
