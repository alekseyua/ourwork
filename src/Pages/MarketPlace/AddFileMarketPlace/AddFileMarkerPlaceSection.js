import React from 'react'
import Menu from '../../../View/Menu/Menu'
import WithWrapContainer from '../../../HOC/WithWrapContainer'
import WrapContainer from '../../../View/WrapContainer/WrapContainer'
import Offset from '../../../View/Offset'
import DownloadProgressBar from '../../../View/DownloadProgressBar/DownloadProgressBar'
import AddLinkMarketPlace from './AddLinkMarketPlace'
import AddFileMarketPlace from './AddFileMarketPlace'
import Line from '../../../View/Line/Line'

function AddFileMarkerPlaceSection({
  values,
  isMark,
  setData,
  handlerScreen,
  valuesPreview,
  loadingPreviewImage,

  tg,
  testSize,
  dispatch,
  listSubMenu,
  handlerSendData,
  handlerChangeData,
  handlerDeleteFile,
  handlerDeleteLink,
  handlerChangeBlur,
  handlerChangeFocus,
  percentageAddFileMP,
}) {
  return (
    <>
      <WrapContainer>
        <Offset mb={17} />
        {/* {
          getLocaleStore(MARKET_CURRENT_TAB_ADD_CARDS) === 'file' ? */}
        {!values?.urlMarket && !valuesPreview?.urlMarket ? (
          <AddFileMarketPlace
            tg={tg}
            values={values}
            setData={setData}
            dispatch={dispatch}
            percentage={percentageAddFileMP}
            valuesPreview={valuesPreview}
            handlerChangeData={handlerChangeData}
            handlerApplyChange={handlerSendData}
            handlerDeleteFile={handlerDeleteFile}
            loadingPreviewImage={loadingPreviewImage}
          />
        ) : null}

        {!values?.file?.length && !valuesPreview?.file?.length ? (
          <AddLinkMarketPlace
            values={values}
            valuesPreview={valuesPreview}
            handlerChangeData={handlerChangeData}
            handlerDeleteLink={handlerDeleteLink}
            handlerChangeBlur={handlerChangeBlur}
            handlerChangeFocus={handlerChangeFocus}
            loadingPreviewImage={loadingPreviewImage}
          />
        ) : null}
      </WrapContainer>
      <Offset mb={50} />
      {/* <DownloadProgressBar percentage={percentageAddFileMP} />

          <Offset mb={
            values?.file?.length?
             'calc(100vh - 100% - 60px)'
              :'calc(100vh - 100% )'
                // : !(values.file.length && valuesPreview?.status_upload) ? 'calc(100vh - 100% - 170px)' : 'calc(100vh - 100% - 320px)'
          }/>

          <Offset mb={
            isFocus ?
             'calc(100vh - 100% - 90px)'
              : valuesPreview?.status_upload ? 
                'calc(100vh - 100% - 500px)' 
                : 'calc(100vh - 100% - 571px)'
                // : !(values.file.length && valuesPreview?.status_upload) ? 'calc(100vh - 100% - 170px)' : 'calc(100vh - 100% - 320px)'
          }/> */}

      <WrapContainer>
        <Menu
          list={listSubMenu}
          handlerScreen={handlerScreen}
          isMark={isMark}
          isStartBigSlide
          iconSize={18}
          margin={45}
        />
        <Offset mb={28} />
      </WrapContainer>
    </>
  );
}

export default WithWrapContainer(AddFileMarkerPlaceSection);