import React from 'react';

import styles from './styles/raiting.module.scss';
import classNames from 'classnames';
import Icon from '../../Icon/Icon';
import { starRaiting, starRaitingFillRed } from '../../../images';

/**
   * values Raiting
   * @param {
   * onChange - при клике по звёздам меняит их состояние
 *  ActiveStar: Number = {4} количество активных звёзд
 *  max=5: Number = {5} - общее количество звёзд в рейтинге
 *  label: String = 'какойто текст после иконки' - добавляем блок с текстом
 *  countRaiting: Number - количество отзывав
 * }
 * 
 * @return
 * 
 */

const Raiting = ({
    max = 5,
    gap = 3,
    label,
    onBlur,
    reverse,
    onChange,
    helptext,
    styleStar = {},
    className,
    ActiveStar,
    countRaiting,
    sizeStarWidth = 16,
    stylehelptext,
    sizeStarHeight = 16,
    backgroundFone,
    isBorderDigital,
    ...props }) => {
    const stars = Array.from({ length: max }).map((_, i) => i + 1);
    const stylesCommon = classNames({
        [className]: !!className,
        [styles['raiting-star__container']]: true,
    })


    return (
        <div
            className={stylesCommon}
            onBlur={onBlur}
            style={{
                flexDirection: reverse ? 'row-reverse' : 'row',
            }}
        >
            {
                !!label || !!countRaiting ?
                    <div
                        className={styles['raiting-star__label']}
                    >
                        {label}  {' '}   {!!countRaiting ? countRaiting : 0}
                    </div>
                    : null
            }
            <div
                className={styles['raiting-star__background-raiting']}
                style={{
                    backgroundColor: backgroundFone ? 'var(--background-color-light-roze)' : 'transparent',
                    gap: gap
                }}
            >
                {
                    stars.map((el, i) => {
                        return (
                            <div
                                style={{
                                    ...styleStar
                                }}
                                key={`raiting-${i}`}
                                value={i}
                                onClick={onChange}
                                className={styles['raiting-star__star']}
                            >
                                <Icon
                                    value={i + 1}
                                    image={+i < +ActiveStar ? starRaitingFillRed : starRaiting}
                                    // invert={i < ActiveStar ? '0%' : '45%'}
                                    // opacity={i < ActiveStar ? '100%' : '20%'}
                                    // brightness={i < ActiveStar ? '100%' : '150%'}
                                    width={sizeStarWidth}
                                    height={sizeStarHeight}
                                />
                            </div>
                        )
                    })
                }


            </div>

            <div
                className={styles['raiting-star__digital-raiting']}
                style={{
                    width: sizeStarWidth,
                    height: sizeStarHeight,
                    border: isBorderDigital ? '1px solid var(--border-color)' : 'none',
                    
                }}
            >{(+ActiveStar).toFixed(1)}</div>
             {
                    helptext ?
                        <span
                            style={{
                                position: 'absolute',
                                bottom: -18,
                                left: 0,
                                ...stylehelptext
                            }}
                        >{helptext}</span>
                        : null
                }
        </div>
    )
}

export default Raiting;