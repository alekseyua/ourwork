import React, { useEffect, useState } from 'react'
import WrapContainer from '../../WrapContainer/WrapContainer'
import Button from '../../Button/Button'
import WrapContainerNavigation from './WrapContainerNavigation'

export default function NavigationSelectRequest({
  sections=2,
  handlerChangeSection = () => {},
  listSection = []
}) {
  const [locationBtn, setLocationBtn] = useState('')
  useEffect(()=>{
    if(sections === 2){
    if(listSection.length){
      const listTypes =  listSection.map( el => el.type)
      switch (listTypes.length) {
        case 1:
          setLocationBtn(`'${listTypes[0]}'`);
          break;
        case 2:
          setLocationBtn(`'${listTypes[0]} ${listTypes[1]}'`);
          break;
        case 3:
          setLocationBtn(`'${listTypes[0]} ${listTypes[1]}' 
          '${listTypes[2]} ${listTypes[2]}'`);
          break;
        case 4:
          setLocationBtn(`'${listTypes[0]} ${listTypes[1]}'
          '${listTypes[2]} ${listTypes[3]}'`);
          break;
        case 5:
          setLocationBtn(`'${listTypes[0]} ${listTypes[1]}'
          '${listTypes[2]} ${listTypes[3]}'
          '${listTypes[4]} ${listTypes[4]}'`);
          break;
        case 6:
          setLocationBtn(`'${listTypes[0]} ${listTypes[1]}'
          '${listTypes[2]} ${listTypes[3]}'
          '${listTypes[4]} ${listTypes[5]}'`);
          break;
        default: setLocationBtn(`''`)
      }
    }} else if(sections === 3){
      if(listSection.length){
        const listTypes =  listSection.map( el => el.type)
        switch (listTypes.length) {

          case 3:
            setLocationBtn(`'${listTypes[0]} ${listTypes[1]} ${listTypes[2]}'`);
            break;
          case 4:
            setLocationBtn(`'${listTypes[0]} ${listTypes[1]} ${listTypes[2]}'
            '${listTypes[3]} ${listTypes[3]} ${listTypes[3]}'
            `);
            break;
          case 5:
            setLocationBtn(`'${listTypes[0]} ${listTypes[1]} ${listTypes[2]}'
            '${listTypes[3]} ${listTypes[4]} ${listTypes[4]}'
            `);
            break;
          case 6:
            setLocationBtn(`'${listTypes[0]} ${listTypes[1]} ${listTypes[2]}'
            '${listTypes[3]} ${listTypes[4]} ${listTypes[5]}'
            `);
            break;
          default: setLocationBtn(`''`)
        }
      }
    } else if(sections === 4){
      if(listSection.length){
        const listTypes =  listSection.map( el => el.type)
        switch (listTypes.length) {

          case 3:
            setLocationBtn(`'${listTypes[0]} ${listTypes[1]} ${listTypes[2]} ${listTypes[2]}'`);
            break;
          case 4:
            setLocationBtn(`'${listTypes[0]} ${listTypes[1]} ${listTypes[2]} ${listTypes[3]}'
            `);
            break;
          case 5:
            setLocationBtn(`'${listTypes[0]} ${listTypes[1]} ${listTypes[2]} ${listTypes[3]}'
            '${listTypes[4]} ${listTypes[4]} ${listTypes[5]} ${listTypes[5]}'
            `);
            break;
          case 6:
            setLocationBtn(`'${listTypes[0]} ${listTypes[1]} ${listTypes[2]}'
            '${listTypes[3]} ${listTypes[4]} ${listTypes[5]}'
            `);
            break;
          default: setLocationBtn(`''`)
        }
      }
    }
  }, [listSection])
  
  if(!listSection.length) return;
  return (
    <WrapContainer>
      <WrapContainerNavigation
        style={{
          gridTemplateColumns: `repeat(${sections}, 1fr )`,
          gridTemplateAreas:  locationBtn //`'full purchase'`
        }}
      >
      {
        listSection.length && listSection.map( section => {
          return (
            <Button
              style={{
                gridArea: `${section.type}`,
                backgroundColor: !section.active?  'var(--bg-block)' : 'var(--background-color-mirage-blue)',
                color: !section.active?  'var(--text-color)' : 'var(--text-color-white)'
              }}
              key={section.id}
              onClick={(e) => {
                handlerChangeSection(e, section.type)
              }
              }
              addClass={'button__navigation-my-application'}
            >
              { 
                section.tab_name 
              }
            </Button>
          )
        })
      }
      </WrapContainerNavigation>
    </WrapContainer>
  )
}
