import React, { useId } from "react";
import Button from "../Button/Button";
import WrapContainer from "../WrapContainer/WrapContainer";
import { settingRedRotation } from "../../images";
import Icon from "../Icon/Icon";
import TooltipComponent from "../../Components/Component.Tooltip/TooltipComponent";
import WithTooltip from "../../HOC/WithTooltip";


const ButtonApplyStatic = ({
  icon,
  show,
  type,
  title,
  formId,
  tooltip,
  isFocus,
  isFetch,
  onClick,
  isActive,
  addClass,
  buttonForm,
  handlerShowTooltip,
}) => {
  const id = useId();
  return (
    <WrapContainer
      style={{
        zIndex: 'var(--z-index-wrap)'
      }}
    >

      {
        isFocus?
        null  
        :
          show ?
            <>
              <TooltipComponent
                onClick={!(isActive)? ()=>{
                  buttonForm()
                  handlerShowTooltip({
                    key: 'validate',
                    id: id,
                    action: 'validate',
                  });
                } : null}
                style={{ bottom: -10, left: -10, }}
                message={tooltip?.validate?.validate?.message}
                isShow={tooltip?.validate?.validate && tooltip?.validate?.validate?.isShow}
              >
                <Button
                  id={id}
                  style={{ width: '100%' }}
                  disabled={!(isActive)}
                  type={type}
                  addClass={addClass}
                  onClick={onClick}
                  form={formId}
                >
                  {title}
                  {
                    isFetch ?
                      <Icon
                       src={settingRedRotation}
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
            </>
            : null

      }
      {/* <pre>
        {JSON.stringify(tooltip, null,4)}
      </pre> */}
    </WrapContainer>
  )
}

export default WithTooltip(ButtonApplyStatic);