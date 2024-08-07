import React from 'react'
import WrapContainer from '../../../View/WrapContainer/WrapContainer'
import Offset from '../../../View/Offset'
import MainFeedbackComponent from '../../FeedbackPage/FeedbackPage'
import WrapContainerBlockBorder from '../../../View/Blocks/WrapContainerBlockBorder'
import BlockTitle from '../../../View/Blocks/BlockTitle'
import WrapContainerBlock from '../../../View/Blocks/WrapContainerBlock'
import Label from '../../../View/Label/Label'
import LinkGoTo from '../../../View/LinkGoTo/LinkGoTo'
import { Link } from 'react-router-dom'
import { linksFeedback, linksFeedbackWarantAdmin } from '../../../helpers/config'

export default function RaitingAndReviewWarrantlyForAdmin({
  context
}) {
  return (
    <WrapContainer>
      <Offset mb={15} />

      <WrapContainerBlockBorder
        style={{
          padding: '15px 18px'
        }}
      >
        <Offset mb={8} />
        <BlockTitle
          style={{
            whiteSpace: 'normal',
            color: `var(--text-color-red)`,
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: '0px'
          }}
        >
          {context.title}
        </BlockTitle>
        <Offset mb={12} />
        {context.desc.map((el, i) => {
          return (
            <WrapContainerBlock key={i}>
              <Label
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  lineHeight: '21px',
                }}
              >
                {++i}. {el}
              </Label>
              <Offset mb={15} />
            </WrapContainerBlock>
          )
        })}
        <Offset mb={12} />

        <Link
          to={'https://t.me/admrazborov'}
          style={{ color: 'var(--text-color-red)' }}
        >
          Связаться с администратором
        </Link>
      </WrapContainerBlockBorder>
      <Offset mt={177} />
      <MainFeedbackComponent list={linksFeedbackWarantAdmin} />
    </WrapContainer>

  )
}
