import React from 'react'
import WrapContainer from '../../WrapContainer/WrapContainer'
import Button from '../../Button/Button'
import WrapContainerNavigation from './WrapContainerNavigation'

export default function NavigationIncominRequests({
  handlerChangeSection = () => {},
  listSection = []
}) {
  return (
    <WrapContainer>
      <WrapContainerNavigation
        style={{
          gridTemplateAreas: `'all top'`,
          filter: `blur(var(--filter-blur))`,

        }}
      >
      {
        listSection.map( section => {
          return (
            <Button
              style={{
                gridArea: `${section.type}`,
                backgroundColor: !section.active?  'var(--background-color-block)' : 'var(--background-color-mirage-blue)',
                color: !section.active?  'var(--text-color)' : 'var(--text-color-white)'
              }}
              key={section.id}
              onClick={(e) => handlerChangeSection(e,  section.type)}
              addClass={'button__navigation-my-application'}
            >
              { 
                section.title 
              }
            </Button>
          )
        })
      }
      </WrapContainerNavigation>
    </WrapContainer>
  )
}
