import React from 'react'
import { ReactSVG } from 'react-svg'


const IconSvg = ({src, addClass, className, width, style, height}) => {
  return (
    <ReactSVG
        className={className}
        src={src}
        style={{
            width:width,
            height:height,
            ...style,
        }}
    />
  )
}

export default IconSvg