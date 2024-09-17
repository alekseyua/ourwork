import React from 'react'
import WrapContainer from '../WrapContainer/WrapContainer'
import WrapGrid from './Detail/WrapGrid'
import CardApplicationContainer from './Detail/CardApplicationContainer'
import Label from '../Label/Label'
import CardContainerTitle from './Detail/CardContainerTitle'
import CardContainerItemTitle from './Detail/CardContainerItemTitle'
import CardItemDescription from './Detail/CardItemDescription'
import Offset from '../Offset'
import CardContainerControlCard from './Detail/CardContainerControlCard'
import Button from '../Button/Button'
import { bascketRed, copyDoc, penGrey } from '../../images'
import Icon from '../Icon/Icon'
import CardPreloadImageContainer from './Detail/CardPreloadImageContainer'
import CardPreloadImageItem from './Detail/CardPreloadImageItem'
import { ACTION_DELETE } from '../../store/api-store/getpage'


export default function CardApplication({
  list,
  handlerActionMyApplication
}) {
  console.log({list})
  return (
    <WrapContainer>
      <WrapGrid>
        {
          list && list.map(item => {
            return (
              <CardApplicationContainer key={item.id}>
                <WrapGrid
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Label
                    style={{
                      fontSize: 12,
                      lineHeight: "10px",
                    }}
                  >
                    {item.user}
                  </Label>
                  <Label style={{ justifyContent: "flex-end" }}>
                    {item.date_create.slice(0, 10)}
                  </Label>
                </WrapGrid>
                <Offset mt={16} />
                {item?.classes && !!item.classes.length ? (
                  <Label style={{ color: "var(--text-color-red)" }}>
                    {item.brand}
                  </Label>
                ) : null}
                {item?.classes && !!item.classes.length ? (
                  item.classes.map((el) => {
                    return (
                      <React.Fragment>
                        <CardContainerTitle>
                          <CardContainerItemTitle>
                            {el.model_name}
                          </CardContainerItemTitle>
                          <CardContainerItemTitle>
                            {el.generation_name}
                          </CardContainerItemTitle>
                        </CardContainerTitle>
                        <Offset mb={10} />
                      </React.Fragment>
                    );
                  })
                ) : item?.brand && item?.model && item.generation ? (
                  <CardContainerTitle>
                    <CardContainerItemTitle
                      style={{ color: "var(--text-color-red)" }}
                    >
                      {item.brand}
                    </CardContainerItemTitle>
                    <CardContainerItemTitle>
                      {item.model}
                    </CardContainerItemTitle>
                    <CardContainerItemTitle>
                      {item.generation}
                    </CardContainerItemTitle>
                  </CardContainerTitle>
                ) : null}
                <Offset mt={15} />
                <CardItemDescription>
                  <Label
                    style={{
                      fontSize: 12,
                      lineHeight: "10px",
                    }}
                  >
                    OEM/VIN
                  {" "}
                  {item.oem}
                  </Label>
                </CardItemDescription>
                <CardItemDescription>{item.text}</CardItemDescription>

                {item?.images && (
                  <React.Fragment>
                    <Offset mt={24} />
                    <CardPreloadImageContainer>
                      {item.images.map((image, i) => {
                        return (
                          <CardPreloadImageItem
                            key={image.id}
                            onClick={(e) => {
                              console.log("click");
                            }}
                          >
                            <Icon
                             src={image.url}
                              width={63}
                              height={63}
                              style={{
                                backgroundRepeat: "repeat-y",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            />
                          </CardPreloadImageItem>
                        );
                      })}
                    </CardPreloadImageContainer>
                  </React.Fragment>
                )}
                <Offset mt={21} />
                <CardContainerControlCard
                  style={{
                    justifyContent: "flex-start",
                    left: 0,
                  }}
                >
                  <Button
                    onClick={() =>
                      handlerActionMyApplication(
                        ACTION_DELETE,
                        item.id,
                        item.type.type
                      )
                    }
                    addClass={"button__application-control-card"}
                    iconRight={bascketRed}
                    style={{
                      color: "var(--text-color-red)",
                      letterSpacing: "0px",
                    }}
                    styleIconsRight={{
                      width: 14,
                      height: 14,
                      top: -2,
                      minWidth: 10,
                      marginRight: 7,
                    }}
                  >
                    Удалить
                  </Button>
                  <Button
                    onClick={() =>
                      handlerActionMyApplication(
                        "copy",
                        item.id,
                        item.type.type
                      )
                    }
                    addClass={"button__application-control-card"}
                    iconRight={copyDoc}
                    style={{
                      color: "var(--text-color-rlight-blue)",
                      letterSpacing: "0px",
                    }}
                    styleIconsRight={{
                      width: 14,
                      height: 14,
                      top: -1,
                      minWidth: 10,
                      marginRight: 10,
                    }}
                  >
                    Дублировать
                  </Button>
                  <Button
                    onClick={() =>
                      handlerActionMyApplication(
                        "edit",
                        item.id,
                        item.type.type
                      )
                    }
                    addClass={"button__application-control-card"}
                    iconRight={penGrey}
                    style={{
                      color: "var(--text-color-rlight-blue)",
                      letterSpacing: "0px",
                    }}
                    styleIconsRight={{
                      width: 14,
                      height: 14,
                      top: -1,
                      minWidth: 10,
                      marginRight: 10,
                    }}
                  >
                    Редактировать
                  </Button>
                </CardContainerControlCard>
              </CardApplicationContainer>
            );
          })
        }
      </WrapGrid>
      <Offset mb={24} />
    </WrapContainer>
  )
}
