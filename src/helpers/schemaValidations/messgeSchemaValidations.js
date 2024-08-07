const messageErrorInit = {
  required: 'Обязательное поле!',
  image: 'Обязательно хотя бы 1 фото',
  shot_title: 'Слишком короткое название',
  long_title: 'Слишком длинное название',
  number: 'ввода только цифр',
  numbervalide: 'Номер телефона недействителен',
  numberphone: 'Это не похоже на номер телефона',
  positive: 'Номер телефона не может начинаться с минуса',
  integer: 'Номер телефона не может содержать десятичную точку',

};

export const messageErrorValidation = {
  title: {
    required: messageErrorInit.required,
    shot: messageErrorInit.shot_title,
    long: messageErrorInit.long_title,
  },
  text: {
    required: messageErrorInit.required,
    shot: messageErrorInit.shot_title,
    long: messageErrorInit.long_title,
  },
  country_id: { required: messageErrorInit.required },
  city_id: { required: messageErrorInit.required },

  brand_id: {
    required: messageErrorInit.required
  },
  model_id: {
    required: messageErrorInit.required
  },
  generation_id: {
    required: messageErrorInit.required
  },
  category_id: {
    required: messageErrorInit.required
  },
  price: {
    number: messageErrorInit.number,
    required: messageErrorInit.required
  },
  oem: {
    required: messageErrorInit.required
  },
  condition: {
    required: messageErrorInit.required
  },
  count: {
    required: messageErrorInit.required,
    number: messageErrorInit.number,
  },
  description: {
    required: messageErrorInit.required
  },
  phone: {
    numbervalide: messageErrorInit.numbervalide,
    required: messageErrorInit.required,
    positive: messageErrorInit.positive,
    integer: messageErrorInit.integer,
  },
  address: {
    required: messageErrorInit.required
  },
  image: {
    required: messageErrorInit.image
  },

}
