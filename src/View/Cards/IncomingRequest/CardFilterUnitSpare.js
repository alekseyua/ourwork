import React from "react";
import Button from "../../Button/Button";
import Icon from "../../Icon/Icon";
import CheckBox from "../../CheckBox";
import WrapTwoColumnGrid from "../../Blocks/WrapTwoColumnGrid";
import WrapContainerBlockBorder from "../../Blocks/WrapContainerBlockBorder";
import Offset from "../../Offset";
import BlockTitle from "../../Blocks/BlockTitle";
import MenuItemIconContainer from "../../Menu/Detali/MenuItemIconContainer";
import { arrowRightWhite, settingWhite } from "../../../images";
import TooltipComponent from "../../../Components/Component.Tooltip/TooltipComponent";

export default function CardFilterUnitSpare({
  card,
  type,
  toolTipAction,
  handlerShowTooltip = () => {},
  handlerChangeScreen,
  handlerSelectItemFilter,
  loadCatalog,
  statusLoadingData,
}) {
  if (!card) return;
  return (
    <>
      <WrapContainerBlockBorder
        style={{
          gridTemplateColumns: `90% 10%`,
          gridTemplate: "revert",
          padding: "12px 14px 14px",
        }}
      >
        <WrapTwoColumnGrid
          style={{
            gridTemplateColumns: card?.image ? `10% 90%` : "100%",
          }}
        >
          {card?.image && <Icon image={card.image} width={24} height={24} />}
          <BlockTitle
            style={{
              top: 2,
              fontWeight: 500,
            }}
          >
            {card.name}
          </BlockTitle>
        </WrapTwoColumnGrid>

        <Offset mb={12} />

        <WrapTwoColumnGrid
          style={{
            gridTemplateColumns: `32% 56% 10%`,
          }}
        >
          <TooltipComponent
            onClick={() =>
              !card?.status_spare?.can_change &&
              handlerShowTooltip({
                action: "disabled-check-" + type,
                id: +card.id + "-unit",
              })
            }
            style={{ bottom: -10, left: -10 }}
            message={toolTipAction.message}
            isShow={
              toolTipAction.id === card.id + "-unit" && toolTipAction.isShow
            }
          >
            <CheckBox
              checked={card?.status_unit?.status}
              disabled={
                statusLoadingData
                  ? statusLoadingData
                  : !card?.status_unit?.can_change
              }
              // disabled={false}
              onChange={(res) => {
                handlerSelectItemFilter({
                  id: res.value,
                  sub_type: "unit",
                  type,
                  checked: res.checked,
                });
              }}
              name={""}
              helptext={"Агрегаты"}
              helpTextStyle={{
                top: 2,
              }}
              style={
                {
                  // marginRight: isShowButton ? 11 : 0
                  // pointerEvents: 'all': none
                }
              }
              value={+card.id}
              // className={style['card-filter__container--checked']}
              id={`check-${card.id}`}
            />
          </TooltipComponent>
          <TooltipComponent
            onClick={() =>
              !card?.status_spare?.can_change &&
              handlerShowTooltip({
                action: "disabled-check-" + type,
                id: +card.id + "-spare",
              })
            }
            style={{ bottom: -10, left: -10 }}
            message={toolTipAction.message}
            isShow={
              toolTipAction.id === card.id + "-spare" && toolTipAction.isShow
            }
          >
            <CheckBox
              checked={card?.status_spare?.status}
              disabled={
                statusLoadingData
                  ? statusLoadingData
                  : !card?.status_spare?.can_change
              }
              onChange={(res) => {
                handlerSelectItemFilter({
                  id: res.value,
                  sub_type: "spare",
                  type,
                  checked: res.checked,
                }); //'spare'
              }}
              name={""}
              helptext={"Запчасти"}
              helpTextStyle={{
                top: 2,
              }}
              value={+card.id}
              // className={style['card-filter__container--checked']}
              id={`check-${card.id}`}
            />
          </TooltipComponent>
          {+card.id !== 0 && type !== "generations" ? (
            <TooltipComponent
              onClick={() =>
                !card?.can_click &&
                handlerShowTooltip({
                  action: "disabled",
                  id: +card.id,
                })
              }
              style={{ bottom: -10, left: -10 }}
              message={toolTipAction.message}
              isShow={toolTipAction.id === card.id && toolTipAction.isShow}
            >
              <Button
                disabled={
                  statusLoadingData
                    ? statusLoadingData
                    : (!card?.can_click)
                }
                onClick={() => {
                  const id = type === "respair" ? card.id_list : card.id;
                  let params = {
                    type,
                    id,
                    image_card: card?.image,
                    name_card: card.name,
                  };

                  handlerChangeScreen(params);
                }}
              >
                <MenuItemIconContainer
                  width={21}
                  height={21}
                  style={{
                    borderRadius: 5,
                    top: 0,
                    backgroundColor:
                      card.status_child_spare || card.status_child_unit
                        ? "var(--background-color-dark-Nile-blue)"
                        : "var(--background-color-icon-red)",
                  }}
                >
                  <Icon
                    image={
                      card.status_child_spare || card.status_child_unit
                        ? settingWhite
                        : arrowRightWhite
                    }
                    width={11}
                    height={11}
                  />
                </MenuItemIconContainer>
              </Button>
            </TooltipComponent>
          ) : null}
        </WrapTwoColumnGrid>
      </WrapContainerBlockBorder>
      <Offset mb={15} />
    </>
  );
}
