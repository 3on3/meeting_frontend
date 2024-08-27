import React from 'react'
import DefaultInput from '../../../../components/common/inputs/DefaultInput'

const DisabledInfoInputs = ({styles, title,placeholder,inputState, value}) => {
  return (
    <>
    <div className={styles.margin20}>
        <div className={styles.lineText}>{title}</div>
      </div>
      <div className={styles.margin35}>
        <DefaultInput
          inputState={inputState}
          placeholder={placeholder}
          value={value}
        />
      </div>
      </>
  )
}

export default DisabledInfoInputs