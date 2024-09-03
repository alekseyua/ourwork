import React from 'react'
import { ReactSVG } from 'react-svg'


const IconSvg = ({src, width, height}) => {
  return (
    <ReactSVG
        src={src}
        style={{
            width:width,
            height:height
        }}
    />
  )
}

export default IconSvg