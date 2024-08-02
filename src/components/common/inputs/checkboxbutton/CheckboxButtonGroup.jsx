import React from 'react'
import Checkbox from './Checkbox';

const CheckboxButtonGroup = () => {

  const [autologin, setAutologin] = React.useState(false);

  return (

    <>
      <Checkbox checked={autologin} onChange={setAutologin}> 
        자동로그인 
      </Checkbox>
      <footer>
        자동로그인 확인(나중에 삭제해도 됨) {JSON.stringify({ autologin })}
      </footer>
    </>
  )
}

export default CheckboxButtonGroup