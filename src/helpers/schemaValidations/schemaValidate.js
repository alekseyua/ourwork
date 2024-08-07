
import { object, string, number, array } from "yup";
const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const phoneRegExp2 = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;


export const createMarket = (message) =>
  object().shape({
    title: string()
      .trim()
      .nonNullable()
      .min(3, message.title.shot)
      .max(100, message.title.long)
      .required(message.title.required),
    country_id: string().required(message.country_id.required),
    city_id: string().required(message.city_id.required),

    brand_id: string().required(message.brand_id.required),
    model_id: string().required(message.model_id.required),
    generation_id: string().required(message.generation_id.required),
    category_id: string().required(message.category_id.required),
    price: number()
      .typeError(message.description.number)
      .moreThan(0, "Стоимость не может быть равной 0")
      .required(message.price.required),
    // oem: string().required(message.oem.required),
    // condition: string().required(message.condition.required),
    // count: number().required(message.count.required),
    // description: string().required(message.description.required),

    phone: string().required(message.phone.required),
    address: string().required(message.address.required),
    image: array().test(
      "image-error",
      message.image.required,
      function (images) {
        if (images.length) return true;
        return false;
      }
    ),
    // image: mixed().test(message.image.required, () => true ),
  });
// .positive(message.phone.positive)
// .integer(message.phone.integer)

export const aggrigateSchema = (message) =>
  object().shape({
    brand_id: string().trim().required(message.brand_id.required),
    model_id: string().trim().required(message.model_id.required),
    // model_id: array().test(
    //   "model-error",
    //   message.brand_id.required,
    //   function (models) {
    //     if (models.length) return true;
    //     return false;
    //   }
    // ),
    generation_id: string().trim().required(message.generation_id.required),
    text: string()
      .trim()
      .min(3, message.text.shot)
      .max(700, message.text.long)
      .required(message.text.required),
  });

export const truckSchema = (message) => object().shape({
  text: string()
    .trim()
    .min(3, message.text.shot)
    .max(700, message.text.long)
    .required(message.text.required),

})
export const reviewSchema = (message) => object().shape({
  text: string()
    .trim()
    .min(3, message.text.shot)
    .max(700, message.text.long)
    .required(message.text.required),
  username: string()
    .trim()
    .min(3, message.text.shot)
    .max(50, message.text.long)
    .required(message.text.required),
  rating: number()
    .test(
      'raiting-require',
      message.text.required,
      value => {
      if(typeof value === 'number' && value !== 0) return true;
      return false
    })
    .required(message.text.required),

})
export const respairSchema = (message) => object().shape({
  country_id: string().trim().required(message.brand_id.required),
  city_id: string().trim().required(message.model_id.required),
  text: string()
    .trim()
    .min(3, message.text.shot)
    .max(700, message.text.long)
    .required(message.text.required),

})

export const editProfile = (message) => object().shape({
  name: string().trim().required(message.text.required),
  text: string().trim().required(message.text.required),
  organization: string().trim().required(message.text.required),
  city: string().trim().required(message.text.required),
  address: string().trim().required(message.text.required),
  phone: string().trim().required(message.text.required),
  avito_prom: string().trim().required(message.text.required),
  add_info: string().trim().required(message.text.required),
})