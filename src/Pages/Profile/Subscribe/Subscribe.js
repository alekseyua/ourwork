import React, { useId } from 'react'
import WrapContainer from '../../../View/WrapContainer/WrapContainer'
import HeaderTitleActionComponent from '../../../Components/Component.HeaderTitleAction/HeaderTitleActionComponent'
import NavigationSelectAccess from '../../../View/Navigation/NavigationMyApplication/NavigationSelectAccess'
import Offset from '../../../View/Offset'
import BlockTitle from '../../../View/Blocks/BlockTitle'
import WrapContainerBlockBorder from '../../../View/Blocks/WrapContainerBlockBorder'
import { checked, settingRedRotation } from '../../../images'
import WrapTwoColumnGrid from '../../../View/Blocks/WrapTwoColumnGrid'
import WrapIconBlock from '../../../View/Blocks/WrapIconBlock'
import Icon from '../../../View/Icon/Icon'
import WrapRowGrid from '../../../View/Blocks/WrapRowGrid'
import WrapTitleDescBlockOpacity from '../../../View/Blocks/WrapTitleDescBlockOpacity'
import WrapContainerPreloader from '../../../View/Preloaders/WrapContainerPreloader'
import Preloader from '../../../View/Preloaders/Preloader'
import WrapContainerBlock from '../../../View/Blocks/WrapContainerBlock'
import SelectPayment from '../../../View/Select/NativeSelect/SelectPayment'
import SelectDesktop from '../../../View/Select/NativeSelect/SelectDesktop'
import CheckBox from '../../../View/CheckBox'
import Button from '../../../View/Button/Button'
import TooltipComponent from '../../../Components/Component.Tooltip/TooltipComponent'
import WithTooltip from '../../../HOC/WithTooltip'
import { getOptionsPaymentPeriod } from '../../../helpers/helpers'
import { Link } from 'react-router-dom'

function Subscribe({
  handlerSetData,
  listSection,
  showDiscount,
  dataSubscribe,
  tooltip,
  isLoading,
  handlerShowTooltip,
  listOptionsPayment,
  handlerApplyPayment,
  handlerChangeSection,
  headerTitleSelectAccess,
  controllButtonSubscribe,
  headerTitleMethodPayment,
  headerTitlePeriodSubscribe,
  listDescriptionAccessPaymentCurrent,
}) {
  const formId = useId();
  console.log(
    listOptionsPayment?.optionsPeriodList &&
      listSection.length &&
      listOptionsPayment?.optionsPeriodList.filter(
        (el) => el.status === listSection.filter((el) => el.active)[0].type
      )[0].terms_list
  );
  console.log({ showDiscount });
  return (
    <WrapContainer>
      <Offset mb={14} />
      <HeaderTitleActionComponent
        fontSize={14}
        fontWeight={700}
        list={headerTitleSelectAccess}
      />
      <Offset mb={8} />
      <NavigationSelectAccess
        handlerChangeSection={handlerChangeSection}
        listSection={listSection}
      />
      <Offset mb={24} />
      <WrapContainerBlockBorder
        style={{
          display: "grid",
          gap: "15px",
        }}
      >
        <Offset mb={3} />
        <BlockTitle style={{ fontWeight: 500 }}>
          {listSection.length &&
            listSection.filter((el) => el.active)[0].title_description}
        </BlockTitle>
        <Offset mb={4} />
        {listSection.length ? (
          listSection
            .filter((el) => el.active)[0]
            .list_description.map((item) => {
              return (
                <WrapContainerBlock key={item.title_desc}>
                  <WrapTwoColumnGrid
                    style={{
                      gridTemplateColumns: `15% 85%`,
                    }}
                  >
                    <WrapIconBlock
                      style={{
                        left: 11,
                      }}
                    >
                      <Icon
                        addClass={"icon__bg-roze-38-checked"}
                        width={14}
                        height={14}
                       src={checked}
                      />
                    </WrapIconBlock>
                    <WrapRowGrid
                      style={{
                        left: 15,
                      }}
                    >
                      <BlockTitle style={{ fontWeight: 500, fontSize: 10 }}>
                        {item.title_desc}
                      </BlockTitle>
                      <WrapTitleDescBlockOpacity
                        style={{ fontWeight: 400, fontSize: 10 }}
                      >
                        <span
                          dangerouslySetInnerHTML={{ __html: item.desc }}
                        ></span>
                        {/* {item.desc} */}
                      </WrapTitleDescBlockOpacity>
                    </WrapRowGrid>
                  </WrapTwoColumnGrid>

                  <Offset mb={14} />
                </WrapContainerBlock>
              );
            })
        ) : (
          <WrapContainerPreloader>
            Загрузка ... <Preloader />
          </WrapContainerPreloader>
        )}
      </WrapContainerBlockBorder>
      <Offset mb={19} />
      <HeaderTitleActionComponent
        fontSize={14}
        fontWeight={700}
        list={headerTitlePeriodSubscribe}
      />
      <Offset mb={8} />
      <form id={formId} onSubmit={handlerApplyPayment}>
        <SelectPayment
          showDiscount={showDiscount}
          options={getOptionsPaymentPeriod(
            listOptionsPayment?.optionsPeriodList &&
              listSection.length &&
              listOptionsPayment?.optionsPeriodList.filter(
                (el) =>
                  el.status === listSection.filter((el) => el.active)[0].type
              )[0].terms_list,
            listSection.length && listSection.filter((el) => el.active)[0].type
          )}
          value={dataSubscribe.period}
          placeholder={"Выберите срок подписки"}
          addClass={"select__dropdown-list-payment"}
          name={"period"}
          id={useId()}
          style={{ zIndex: 997 }}
          onClick={(e) => {
            const key_value = e.target.getAttribute("key_value");
            const key = e.name;
            handlerSetData({ key: "period", value: key_value });
          }}
        />
        <Offset mb={13} />

        <HeaderTitleActionComponent
          fontSize={14}
          fontWeight={700}
          list={headerTitleMethodPayment}
        />
        <Offset mb={6} />
        <TooltipComponent
          onClick={() =>
            !dataSubscribe.period &&
            handlerShowTooltip({
              key: "subscribe",
              action: "bank",
              id: "bank",
            })
          }
          id={"bank"}
          style={{ bottom: -10, left: -10 }}
          message={tooltip?.subscribe?.bank?.message}
          isShow={tooltip?.subscribe?.bank && tooltip?.subscribe?.bank?.isShow}
        >
          <SelectDesktop
            options={listOptionsPayment.optionsBank}
            disabled={!dataSubscribe.period}
            value={dataSubscribe.bank}
            placeholder={"Выберите способ оплаты"}
            addClass={"select__dropdown-list-car"}
            name={"bank"}
            id={useId()}
            style={{ zIndex: 996, borderColor: "red" }}
            onClick={(e) => {
              const value = e.target.getAttribute("value");
              const key_value = e.target.getAttribute("key_value");
              handlerSetData({ key: "bank", value: key_value });
            }}
          />
        </TooltipComponent>

        <Offset mb={18} />
        <CheckBox
          checked={dataSubscribe.auto_payment}
          // checked={true}
          variant={"auto-payment"}
          onChange={(e) => {
            const value = !e.checked;
            const key = e.name;
            handlerSetData({ key: "auto_payment", value });
          }}
          name={"auto_payment"}
          id={useId()}
          helptext={"Автоплатеж"}
          helpTextStyle={{
            fontSize: 14,
            fontWeight: 500,
            lineHeight: "20px",
          }}
        />
        <Offset mb={14} />

        <TooltipComponent // false                   false
          onClick={() =>
            !controllButtonSubscribe &&
            !isLoading &&
            handlerShowTooltip({
              key: "subscribe",
              action: "gotoPayment",
              id: "gotoPayment",
            })
          }
          id={"gotoPayment"}
          style={{ bottom: -10, left: -10 }}
          message={tooltip?.subscribe?.gotoPayment?.message}
          isShow={
            tooltip?.subscribe?.gotoPayment &&
            tooltip?.subscribe?.gotoPayment?.isShow
          }
        >
          <Button
            id={useId()}
            disabled={!controllButtonSubscribe}
            addClass={"button__controll--red--full"}
            type={"submit"}
            form={formId}
          >
            Перейти к оплате
            {isLoading ? (
              <Icon
               src={settingRedRotation}
                width={20}
                height={20}
                style={{
                  position: "absolute",
                  right: 10,
                  top: 15,
                }}
              />
            ) : null}
          </Button>
        </TooltipComponent>
      </form>
      <Offset mb={19} />
      <WrapTitleDescBlockOpacity
        style={{
          lineHeight: "22px",
          fontSize: 12,
          fontWeight: 400,
        }}
      >
        <p>ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ КАРАКИЧ</p>
        <p>АЛЕКСАНДР ВИКТОРОВИЧ</p>
        <p>ИНН: 746000800490</p>
        <p>ОГРНИП: 321745600046337</p>
        <p>
          Почтовый адрес: 456537, Челябинская обл, Томинский п, Солнечная ул, д.
          1, кв.(оф.) 1
        </p>
        <p>
          Номер телефона:{" "}
          <Link to={`tel:+73517794581`} target="_blank">
            +7 (351) 779 45 81                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
          </Link>
        </p>
        <p>Почта: Ruuum.pro@yandex.ru</p>
      </WrapTitleDescBlockOpacity>
      <Offset mb={100} />
    </WrapContainer>
  );
}
export default WithTooltip(Subscribe);
