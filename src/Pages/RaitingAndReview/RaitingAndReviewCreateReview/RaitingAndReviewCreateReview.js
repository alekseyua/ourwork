import React from 'react'
import WrapContainer from '../../../View/WrapContainer/WrapContainer'
import { Formik } from 'formik';
import { Form } from 'react-router-dom';
import Offset from '../../../View/Offset';
import Label from '../../../View/Label/Label';
import RaitingContainer from '../../../View/Raiting/RaitingContainer';
import TextArea from '../../../View/TextArea/TextArea';
import Input from '../../../View/Input/Input';
import { getLocaleStore } from '../../../helpers/utils';
import { USERNAME } from '../../../helpers/config';
import { reviewSchema } from '../../../helpers/schemaValidations/schemaValidate';
import { messageErrorValidation } from '../../../helpers/schemaValidations/messgeSchemaValidations';
import { ACTION_SET_CONTROLL_BUTTON } from '../../../store/helpers/helpers-store';

export default function RaitingAndReviewCreateReview({
  dispatch,
  handlerChangeDataValues,
}) {
  return (
    <WrapContainer>
      <Formik
        validationSchema={reviewSchema(messageErrorValidation)}
        initialValues={{
          text: '',
          rating: 0,
          username: getLocaleStore(USERNAME) ?? '',
        }}
      >
        {({ values, errors, handleSubmit, touched, handleBlur, setFieldValue }) => {
          dispatch(ACTION_SET_CONTROLL_BUTTON, { buttonForm: handleSubmit });
          const handlerChangeReviewStar = data => {
            const amountStar = data.target.getAttribute('value');
            setFieldValue('rating', amountStar);
            handlerChangeDataValues({ 'rating': amountStar });
            !!values?.username && handlerChangeDataValues({ [USERNAME]: values.username });
          }
          return (
            <Form >
              <Offset mt={15} />
              <Label style={{ fontWeight: 700 }}>Продавец</Label>
              <Offset mt={4} />
              <div
              
              >

                <Input
                  value={values.username}
                  height={48}
                  disabled={getLocaleStore(USERNAME)}
                  placeholder={'Введите имя пользователя'}
                  distationtop={10}
                  style={{
                    border: touched?.username && errors?.username ? '1px solid #ff0000' : '',
                    paddingLeft: 8,
                    top: 4
                  }}
                  name={USERNAME}
                  onBlur={handleBlur}
                  helptext={touched?.username && errors?.username}
                  stylehelptext={{
                    color: 'var(--text-color-red)'
                  }}
                  onChange={e => {
                    const value = e.target.value;
                    setFieldValue(USERNAME, value);
                    handlerChangeDataValues({ [USERNAME]: value })
                  }}
                />
              </div>
              <Offset mt={27} />
              <Label style={{ fontWeight: 700, letterSpacing: '0px' }}>Ваша оценка</Label>
              <Offset mt={3} />

              <RaitingContainer
                max={5}
                value={values.rating}
                onChange={e => handlerChangeReviewStar(e, values)}
                sizeStarHeight={24}
                sizeStarWidth={24}
                isBorderDigital

                onBlur={handleBlur}
                helptext={touched?.rating && errors?.rating}
                stylehelptext={{
                  color: 'var(--text-color-red)'
                }}
              />
              <Offset mt={16} />
              <Label style={{ fontWeight: 700, letterSpacing: '0px' }}>Напишите отзыв</Label>
              <Offset mt={7} />
              <div>

                <TextArea
                  className={'textarea-application'}
                  value={values.text}
                  name={'text'}
                  placeholder={`Опишите ваше впечатление о продавце. Выделите плюсы или минусы работы`}
                  height={90}
                  id={`textarea-1`}
                  style={{
                    border: touched?.text && errors?.text ? '1px solid #ff0000' : '',
                  }}
                  onBlur={handleBlur}
                  helptext={touched?.text && errors?.text}
                  stylehelptext={{
                    color: 'var(--text-color-red)'
                  }}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFieldValue('text', value);
                    handlerChangeDataValues({ 'text': value })
                    !!values?.username && handlerChangeDataValues({ [USERNAME]: values.username });

                  }}
                />
              </div>
              <Offset mt={37} />
            </Form>
          )
        }
        }
      </Formik>
    </WrapContainer>
  )
}
