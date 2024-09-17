import classNames from 'classnames';
import React from 'react';

import styleMain from './styles/icon.module.scss';
import stylesAddClass from './styles/icon-addclass.module.scss';

const Icon = ({
    value,
    style,
    src,
    width = 20,
    height = 20,
    mr = 0,
    ml = 0,
    mt = 0,
    mb = 0,
    filter,
    onClick,
    invert,
    zIndex,
    opacity,
    addClass,
    children,
    className,
    brightness,
    ...props
}) => {
    const styleImage = classNames({
        [styleMain['icon__image']]: true,
        [className]: !!className,
        [stylesAddClass[addClass]]: !!addClass,

    })
    const dataFilter = () => {
        let value
        if (invert !== undefined && invert !== null) {
            value = `invert(${invert})`
        }
        return value;
    }
    return (
        <React.Fragment>
            <div
                loading="lazy"
                value={value}
                className={styleImage}
                onClick={onClick}
                style={{
                    backgroundImage: `url(${src})`,
                    width: `${width}px`,
                    minWidth: `${width}px`,
                    height: `${height}px`,
                    marginRight: `${mr}px`,
                    marginLeft: `${ml}px`,
                    marginTop: `${mt}px`,
                    marginBottom: `${mb}px`,
                    zIndex: zIndex,
                    filter: dataFilter(),
                    opacity: `${opacity}`,
                    ...style
                }}
                {...props}
            >{children}</div>
        </React.Fragment>       
    )
}
export default Icon;