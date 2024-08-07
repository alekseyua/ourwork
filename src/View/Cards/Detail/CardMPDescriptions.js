import React from "react";
import styles from '../styles/cardmp.module.scss'

const CardMPDescriptions = ({ children, style = {}, title }) => {

  return (
    <div
      className={styles['cardmp__descriptions']}
      style={style}
    >
      {
        title && 
        <p
          className={styles['cardmp__descriptions-title']}
        >
          {title}
        </p>
      }
      <p
        style={{paddingTop:10}}
        dangerouslySetInnerHTML={{ __html: children }}
      >
      </p>
    </div>
  )
}

export default CardMPDescriptions;