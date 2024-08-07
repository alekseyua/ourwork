import React, { Component } from 'react'
import FixBugs from './FixBugs'
import { getLocaleStore } from '../../helpers/utils';
import WithRouter from '../../HOC/WithRouter';
import { plusDarkBlue } from '../../images';
import BlockTitle from '../../View/Blocks/BlockTitle';
import WrapTitleDescBlockOpacity from '../../View/Blocks/WrapTitleDescBlockOpacity';
import Offset from '../../View/Offset';

 class FixBugsContainer extends Component {
   state = {
     listMounthFixedBugs: [
       {
         title: "Апрель",
         description: (
           <div>
             <BlockTitle>Исправлено: </BlockTitle>
             <WrapTitleDescBlockOpacity>
               Торможение работы приложения при определенных условиях в
               параметрах Маркета.
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               Прерывание работы окна бота при свайпе в городах гарантах.
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               Неточное отображение окна параметров Маркета.
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               Неверное отображение параметров входящих заявок.
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               Мерцания экрана во входящих заявках.
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               Отсутствие некоторых городов в запросах на ремонт.
             </WrapTitleDescBlockOpacity>

             <Offset mb={15} />
             <BlockTitle>Нововведения: </BlockTitle>
             <WrapTitleDescBlockOpacity>
               Перестроен порядок брендов для удобства выбора.
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               Добавлена инструкция по работе с ботом.
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               Изменен дизайн раздела «Профиль» и создания карточки Маркета.
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               В разделе «Входящие заявки» добавлен указатель на примененные
               фильтры.
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               В разделе «Рейтинг и отзывы» добавлен параметр «Количество дней в
               сервисе» пользователя.
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               В разделе оплат введены скидки на тарифы.
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               Сохранение выставленных параметров в Маркетплейсе.
             </WrapTitleDescBlockOpacity>
           </div>
         ),
         icon: plusDarkBlue,
         isActive: false,
         isLittleBlock: true,
         id: 0,
       },
       {
         title: "Май",
         description: (
           <div>
             <BlockTitle>Исправлено: </BlockTitle>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               Несрабатывание вставки скопированного текста в полях поиска.
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               Неполное отображение изменений и цен в карточках Маркета.
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               Некорректное отображения текста карточек в разделе «Мои
               объявления».
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               Неточное воспроизведение выпадающего списка поколений в разделе
               «Создать запрос»
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               Остановка роботы бота при переходе в раздел «запрос на
               грузоперевозки».
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               Неполное отображение окна модели авто в создании объявления.
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               Отсутствие активности кнопки «Опубликовать» в создании
               объявления.
             </WrapTitleDescBlockOpacity>

             <Offset mb={15} />
             <BlockTitle>Нововведения: </BlockTitle>
             <WrapTitleDescBlockOpacity>
               Добавлена удобная разметка отзывов.
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               Ускоренно время загрузки между страницами Маркета.
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               Возможность размещения авто на продажу.
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               Появилось поле, указывающее на формат файла при загрузке в
               Маркетплейс.
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               Добавлена возможность оставления комментария на отзыв в разделе
               «Мои Отзывы».
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               Выпадающий список в выборе города изменен на поле поиска с
               подсказкой в разделах «Создать Объявление» и «Создать запрос на
               ремонт».
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               Добавлена информация о условиях автовыгрузки в Маркетплейс.
             </WrapTitleDescBlockOpacity>
           </div>
         ),
         icon: plusDarkBlue,
         isActive: false,
         isLittleBlock: true,
         id: 1,
       },
       {
         title: "Июнь",
         description: (
           <div>
             <BlockTitle>Исправлено: </BlockTitle>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               Смещение и пропадание кнопок «хорошие» и «плохие» в разделе «Мои
               отзывы».
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               Ошибка переключения страниц в разделе «Гаранты» ТОП 100.
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               Решена проблема съезжания текстового поля и поля для ввода OEM и
               VIN в разделе «Создать запрос».
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               Введено ограничение на количество оставленных отзывов одному
               пользователю.
             </WrapTitleDescBlockOpacity>

             <Offset mb={15} />
             <BlockTitle>Нововведения: </BlockTitle>
             <WrapTitleDescBlockOpacity>
               Функция удаления оставленных отзывов в разделе «Мои отзывы».
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               Ограничение по загрузке карточек через файл/ссылку до 50 Мб в
               разделе «Создать объявление».
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               Возможность добавления нескольких моделей и поколений в разделе
               "Создать запрос".
             </WrapTitleDescBlockOpacity>
             <Offset mb={5} />
             <WrapTitleDescBlockOpacity>
               В разделе «Создать запрос» добавлены выпадающие предложения
               карточек по совпадениям OEM или VIN.
             </WrapTitleDescBlockOpacity>
           </div>
         ),
         icon: plusDarkBlue,
         isActive: true,
         isLittleBlock: true,
         id: 2,
       },
       {
         title: "Июль",
         description: "Ведутся работы",
         icon: plusDarkBlue,
         isActive: false,
         isLittleBlock: true,
         id: 2,
       },
     ],
   };
   handlerChangeStateMounth = (id, status) => {
     this.setState((state) => ({
       ...state,
       listMounthFixedBugs: this.state.listMounthFixedBugs.map((el) => {
         if (id === el.id) {
           return {
             ...el,
             isActive: status === "hide" ? false : true,
             isLittleBlock: true,
           };
         }
         return {
           ...el,
           isActive: false,
           isLittleBlock: true,
         };
       }),
     }));
   };

   componentDidMount() {
     this.props.controllerHeaderBand({
       currentTextHandlerBand: "Обновления",
       pathBackButton: getLocaleStore("lastPathFeedback"),
     });
   }

   render() {
     return (
       <FixBugs
         listMounthFixedBugs={this.state.listMounthFixedBugs}
         handlerChangeStateMounth={this.handlerChangeStateMounth}
       />
     );
   }
 }
export default WithRouter(FixBugsContainer);