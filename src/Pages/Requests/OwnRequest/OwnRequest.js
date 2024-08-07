import React from 'react'
import NavigationMyApplication from '../../../View/Navigation/NavigationMyApplication/NavigationMyApplication'
import CardApplication from '../../../View/Cards/CardApplication'
import Offset from '../../../View/Offset'

export default function OwnRequest({
  listSection,
  listMyApplication,
  countMyApplication,
  changePaginationPage,
  handlerChangeSection,
  currentPageMyApplication,
  handlerActionMyApplication,
}) {
  return (
    <div>
      <Offset mt={10} />
      <NavigationMyApplication 
        handlerChangeSection={handlerChangeSection}
        listSection={  listSection}
      />
      <Offset mt={14} />
      <CardApplication
        list={listMyApplication}
        countMyApplication={countMyApplication}
        changePaginationPage={changePaginationPage}
        currentPageMyApplication={currentPageMyApplication}
        handlerActionMyApplication={handlerActionMyApplication}
      />
    </div>
  )
}
