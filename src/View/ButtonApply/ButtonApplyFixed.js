import React, {useId} from "react";
import Button from "../Button/Button";
import WrapContainer from "../WrapContainer/WrapContainer";
import Icon from "../Icon/Icon";
import { settingRedRotation } from "../../images";
import TooltipComponent from "../../Components/Component.Tooltip/TooltipComponent";
import WithTooltip from "../../HOC/WithTooltip";
import { isAndroid, isIos } from "../../helpers/utils";

const ButtonApplyFixed = ({
  id,
  icon,
  show,
  type,
  title,
  isFetch,
  onClick,
  isActive,
  addClass,
  buttonForm,
  handlerShowTooltip,
}) => {
  return (
    <WrapContainer
      style={{
        zIndex: 99
      }}
    >
      <TooltipComponent
        onClick={!(isActive) ? () => { handlerShowTooltip({ action: 'validate', id }); buttonForm() } : null}
      >
        <Button
          id={useId()}
          style={{
            position: 'fixed',
            top: isIos() || isAndroid()? '84vh' : '82vh',
            width: 'calc(100vw - 40px)'
          }}
          disabled={!(isActive)}
          type={type}
          addClass={addClass}
          onClick={onClick}
        >
          {title}
          {
            isFetch ?
              <Icon
                image={settingRedRotation}
                width={20}
                height={20}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 15,
                }}
              />
              : null
          }
        </Button>
      </TooltipComponent>
    </WrapContainer>
  )
}

export default WithTooltip(ButtonApplyFixed);