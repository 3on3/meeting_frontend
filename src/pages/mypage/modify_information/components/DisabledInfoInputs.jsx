import React from 'react'
import DefaultInput from '../../../../components/common/inputs/DefaultInput'

const DisabledInfoInputs = ({styles, title,placeholder,inputState}) => {
  return (
    <>
    <div className={styles.margin20}>
        <div className={styles.lineText}>{title}</div>
      </div>
      <div className={styles.margin35}>
        <DefaultInput
          inputState={inputState}
          placeholder={placeholder}
        />
      </div>
      </>
  )
}

export default DisabledInfoInputs