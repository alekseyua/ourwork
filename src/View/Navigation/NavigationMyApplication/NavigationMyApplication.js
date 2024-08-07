import React from 'react'
import WrapContainer from '../../WrapContainer/WrapContainer'
import Button from '../../Button/Button'
import WrapContainerNavigationMyApplication from './WrapContainerNavigationMyApplication'

export default function NavigationMyApplication({
  handlerChangeSection = () => {},
  listSection = []
}) {
  return (
    <WrapContainer>
      <WrapContainerNavigationMyApplication>
      {
        listSection.map( section => {
          return (
            <Button
              style={{
                gridArea: `${section.type}`,
                backgroundColor: !section.active?  'var(--background-color-block)' : 'var(--background-color-Mirage-blue)',
                color: !section.active?  'var(--text-color)' : 'var(--text-color-white)'
              }}
              key={section.id}
              onClick={(e) => handlerChangeSection(e, section.type)}
              addClass={'button__navigation-my-application'}
            >
              { 
                section.title 
              }
            </Button>
          )
        })
      }
      </WrapContainerNavigationMyApplication>
    </WrapContainer>
  )
}
