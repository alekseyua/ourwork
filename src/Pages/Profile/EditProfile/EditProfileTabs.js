import React, { useId, useState } from 'react'
import WrapContainer from '../../../View/WrapContainer/WrapContainer'
import Offset from '../../../View/Offset'
import Label from '../../../View/Label/Label'
import Input from '../../../View/Input/Input'
import { penGrey } from '../../../images'
import Line from '../../../View/Line/Line'
import TextArea from '../../../View/TextArea/TextArea'
import WrapContainerPreloader from '../../../View/Preloaders/WrapContainerPreloader'
import Preloader from '../../../View/Preloaders/Preloader'
import { autoFocusFormInput, checkEmptyDataObject, removeFocusFormInput, setSessionStore } from '../../../helpers/utils'
import { Form, Formik } from 'formik'
import { ACTION_SET_CONTROLL_BUTTON } from '../../../store/helpers/helpers-store'
import PhoneContainer from '../../../View/PhoneContainer/PhoneContainer'
import ErrorMessage from '../../../View/ErrorMessage/ErrorMessage';
import Phone, { isPossiblePhoneNumber } from 'react-phone-number-input/input'
import Icon from '../../../View/Icon/Icon'
import { editProfile } from '../../../helpers/schemaValidations/schemaValidate'
import { messageErrorValidation } from '../../../helpers/schemaValidations/messgeSchemaValidations'
import NavigationSelectRequest from '../../../View/Navigation/NavigationMyApplication/NavigationSelectRequest'


export default function EditProfileTabs({
  dispatch,
  profileData,
  handlerSetDataProfile,

  action_tab,
  listSectionTabs,
  handlerChangeSection,
}) {
  if (checkEmptyDataObject(profileData)) return (<WrapContainerPreloader>Загрузка ... <Preloader /><Offset mb={30} /></WrapContainerPreloader>);
  const [isValidNumber, setIsValidNumber] = useState(profileData.phone)
  const formId = useId();

  return (
    <>
               <Offset mt={15} />

<NavigationSelectRequest
  handlerChangeSection={handlerChangeSection}
  listSection={listSectionTabs}
/>
  <Offset mt={5} />

              <Line />

    <Formik
      initialValues={profileData}
      validationSchema={editProfile(messageErrorValidation)}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {
        ({ values, errors, resetForm, handleSubmit, onSubmit, touched, handleBlur, setFieldValue }) => {
          dispatch(ACTION_SET_CONTROLL_BUTTON, { buttonForm: handleSubmit, formId });
          return (
            <Form id={formId} onSubmit={onSubmit}>

            <WrapContainer>
            {
                action_tab === listSectionTabs[0].type ?
                  <>
              <Offset mb={10} />
              <Label style={{ fontWeight: 500 }}>Ваше имя</Label>
              <Offset mb={14} />
              <Input
                value={values.name}
                placeholder={'Введите имя пользователя'}
                name={'name'}
                height={50}
                onChange={e => {
                  const value = e.target.value;
                  const key = e.target.name
                  setFieldValue([key], value)
                  handlerSetDataProfile({ key: [key], value })
                }}
                onBlur={handleBlur}
                helptext={touched?.name && errors?.name}
                style={{
                  border: touched?.name && errors?.name ? '1px solid #ff0000' : '',
                }}
                stylehelptext={{
                  color: 'var(--text-color-red)'
                }}
                iconRight={penGrey}
                styleIconRight={{
                  width: 14,
                  height: 14
                }}
              />
              <Offset mb={14} />
              <Label style={{ fontWeight: 500 }}>Название/вид организации</Label>
              <Offset mb={14} />
              <Input
                value={profileData.organization}
                name={'organization'}
                height={50}
                placeholder={'Bavarian–motors.ru'}
                onBlur={handleBlur}
                helptext={touched?.organization && errors?.organization}
                style={{
                  border: touched?.organization && errors?.organization ? '1px solid #ff0000' : '',
                }}
                stylehelptext={{
                  color: 'var(--text-color-red)'
                }}
                onChange={e => {
                  const value = e.target.value;
                  const key = e.target.name
                  setFieldValue([key], value)
                  handlerSetDataProfile({ key: [key], value })
                }}
                iconRight={penGrey}
                styleIconRight={{
                  width: 14,
                  height: 14
                }}
              />
              <Offset mb={38} />
              </>
              : action_tab === listSectionTabs[1].type ?<>
              <Offset mb={10} />
              <Label style={{ fontWeight: 500 }}>Ваш город</Label>
              <Offset mb={14} />
              <Input
                value={profileData.city}
                name={'city'}
                height={50}
                placeholder={'Астрахань'}
                onBlur={handleBlur}
                helptext={touched?.city && errors?.city}
                style={{
                  border: touched?.city && errors?.city ? '1px solid #ff0000' : '',
                }}
                stylehelptext={{
                  color: 'var(--text-color-red)'
                }}
                onChange={e => {
                  const value = e.target.value;
                  const key = e.target.name
                  setFieldValue([key], value)
                  handlerSetDataProfile({ key: [key], value })
                }}
                iconRight={penGrey}
                styleIconRight={{
                  width: 14,
                  height: 14
                }}
              />
              <Offset mb={14} />
              <Label style={{ fontWeight: 500 }}>Ваш адрес</Label>
              <Offset mb={14} />
              <Input
                value={profileData.address}
                name={'address'}
                height={50}
                placeholder={'Например, Ленина 23/а'}
                onBlur={handleBlur}
                helptext={touched?.address && errors?.address}
                style={{
                  border: touched?.address && errors?.address ? '1px solid #ff0000' : '',
                }}
                stylehelptext={{
                  color: 'var(--text-color-red)'
                }}
                onChange={e => {
                  const value = e.target.value;
                  const key = e.target.name
                  setFieldValue([key], value)
                  handlerSetDataProfile({ key: [key], value })
                }}
                iconRight={penGrey}
                styleIconRight={{
                  width: 14,
                  height: 14
                }}
              />
              <Offset mb={14} />
              <Label style={{ fontWeight: 500 }}>Телефон</Label>
              <Offset mb={14} />
            
              <PhoneContainer>
                <Phone
                  placeholder={'+7 (000) 000-00-00'}
                  value={values.phone}
                  className={'form-input-number-phone-marketplace'}
                  id={'phone'}
                  autoComplete={'off'}
                  style={{
                    height: 48,
                    width: '100%',
                    borderRadius: 8,
                    border: touched?.phone && errors?.phone ? '1px solid #ff0000' : `1px solid var(--border-color)`,
                    borderWidth: 1,
                    color: `var(--placeholder-color)`,
                    padding: '10px 13px',
                    pointerEvents: 'all',
                    position: 'relative'
                  }}

                  name={'phone'}
                  onFocus={(e) => {
                    setSessionStore('isOpenKeyboard')
                    return autoFocusFormInput(e, dispatch)
                  }}
                  onBlur={e =>{
                    removeFocusFormInput(e, dispatch)
                    return handleBlur(e)
                  }}
                  helptext={touched?.phone && errors?.phone}
                  stylehelptext={{
                    color: 'var(--text-color-red)'
                  }}
                  rules={{ validate: isPossiblePhoneNumber }}
                  onChange={(phone) => {
                    try {
                      setIsValidNumber(isPossiblePhoneNumber(phone))
                    } catch (error) {
                      setIsValidNumber(false)
                    }
                    setFieldValue('phone', phone)
                    handlerSetDataProfile({ key: 'phone', value: phone })
                  }}
                >
                </Phone>
                <Icon
                  image={penGrey}
                  width={14}
                  height={14}
                  style={{
                    position: 'absolute',
                    right: 22,
                    top: 15,
                  }}
                />
                {
                  touched?.phone && errors?.phone ? <ErrorMessage>{errors?.phone} </ErrorMessage>
                    // : !isValidNumber ?
                    //   <ErrorMessage>{'Номер телефона недействителен'}</ErrorMessage>
                      : null}
              </PhoneContainer>
              <Offset mb={34} />
                </>
               : <>
              <Offset mb={24} />
              <Label style={{ fontWeight: 500 }}>Ссылка на авито/дром</Label>
              <Offset mb={14} />
              <Input
                value={profileData.avito_prom}
                placeholder={'https://auto.drom.ru/moscow/honda/accord/53151019.html'}
                name={'avito_prom'}
                height={50}
                onChange={e => {
                  const value = e.target.value;
                  const key = e.target.name
                  setFieldValue([key], value)
                  handlerSetDataProfile({ key: [key], value })
                }}
                iconRight={penGrey}
                styleIconRight={{
                  width: 14,
                  height: 14
                }}
              />
              <Offset mb={24} />
              <Label style={{ fontWeight: 500 }}>Дополнительная информация</Label>
              <Offset mb={14} />
              <TextArea
                className={'textarea-application'}
                value={profileData.add_info}
                name={'add_info'}
                placeholder={`Быстрая доставка, качество`}
                height={100}
                id={`textarea-1`}
                onChange={(e) => {
                  const value = e.target.value;
                  const key = e.target.name
                  setFieldValue([key], value)
                  handlerSetDataProfile({ key: [key], value })
                }}
              />
              <Offset mb={32} />
              </>
            }
            </WrapContainer>
            </Form>
          )
        }
      }
    </Formik>
    </>

  )
}
