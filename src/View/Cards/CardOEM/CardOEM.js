import React from 'react'
import styles from './styles/oem.module.scss'
import Icon from '../../Icon/Icon'
import { cell_car } from '../../../images';
import CardMPTitle from '../Detail/CardMPTitle';
import Offset from '../../Offset';
import { Link } from 'react-router-dom';
import { MARKETPLACE_DETAILY_CARD } from '../../../helpers/config';

export default function CardOEM({
    list
}) {
  return (
    <React.Fragment>
        <div className={styles["oem__list-container"]}>
          {list.length
            ? list.map((item) => (
                  <Link
                    to={MARKETPLACE_DETAILY_CARD}
                    state={{ card: item }}
                    style={{
                      zIndex: "var(--z-index-element-link)",
                      // marginTop: 11
                    }}
                  >
              <div className={styles["oem__container"]}>
                  <Icon
                    image={
                      item.image_urls?.length
                        ? item.image_urls[0].url
                        : cell_car
                    }
                    width={71}
                    height={71}
                    style={{
                      borderRadius: 8,
                      backgroundColor: "var(--background-color-block)",
                      border: "1px solid var(--border-color)",
                      backgroundSize: "cover",
                    }}
                  />
                  <Offset mb={3} />
                  <CardMPTitle
                    style={{
                      minHeight: 17, //60
                      maxWidth: `82px`,
                      display: `-webkit-box`,
                      WebkitLineClamp: `1`,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.title}
                  </CardMPTitle>
                </div>
            </Link>
              ))
            : null}
        </div>
    </React.Fragment>
  );
}
