import React from 'react'
import styles from './styles/accordion.module.scss'
import Icon from '../Icon/Icon'

export default function ItemAccordionIcon({
  image,
  style = {},
  styleItemIcon = {},
  isOpen,
  data_desc,
  onClick = () => { },
  ...props }) {
  return (
    <div
      data-desc={data_desc}
      className={styles['accordion__item-icon']}
      onClick={(event) => {
        onClick(event)
      }}
      style={{
        transform: isOpen ? `rotate(-${45}deg)` : `rotate(${0}deg)`,
        ...style
      }}
    >
      <Icon
        image={image}
        width={20}
        height={20}
        style={{
          pointerEvents: 'none',
          ...styleItemIcon
        }}
        {...props}
      />
    </div>
  )
}

// isOpen && isShow.show && isShow.accord === accord? 
//                         `rotate(-${isShow.deg}deg)`