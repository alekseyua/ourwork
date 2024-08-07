import React from 'react'
import WrapContainer from '../WrapContainer/WrapContainer'
import TextArea from '../TextArea/TextArea'
import Offset from '../Offset';
import Button from '../Button/Button';

export default function Feedback({
  placeholder,
  textInputFeedback,
  handlerChangeInputText,
}) {
  return (
    <WrapContainer>
      <Offset mb={14} />
      <div>
      <div>

      <TextArea
        // className={'textarea-application-background'}
        value={textInputFeedback}
        name={'description'}
        placeholder={placeholder[0]}
        height={100}
        distationtop={10}
        id={`textarea-1`}
        onChange={(e) => {
          const value = e.target.value;
          handlerChangeInputText({ text: value })
        }}
        />
      </div>
      </div>
      <Offset mb={24} />
    </WrapContainer>
  )
}
