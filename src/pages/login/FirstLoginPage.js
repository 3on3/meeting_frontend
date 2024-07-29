import React, { useState } from 'react'
import FirstLoginProfile from './components/FirstLoginProfile'
import FirstLoginNickName from './components/FirstLoginNickName'

const FirstLoginPage = () => {
  const [step, setStep] = useState(1);
  
  const nextStepHandler = () => {
    setStep(step + 1);
  };

  return (
    <>
      {step === 1 && <FirstLoginProfile  nextHandler={nextStepHandler}/>}
      {step === 2 && <FirstLoginNickName />}
    </>

  )
}

export default FirstLoginPage