import React, { memo, useEffect, useState } from "react";
import Icon from "../../View/Icon/Icon";

import styles from './styles/spinner.module.scss';
import { settingRed } from "../../images";


const Spinner = ({
    text = ' ',
    time = 1000,
    style = {},
    isLoading = false,
}) => {
    const [newText, setNewText] = useState('');
    let timer = null;
    useEffect(() => {
        timer = setTimeout(() => {
            !isLoading && setNewText(text);
        }, time)
        return () => clearTimeout(timer)
    }, [text, isLoading])
    return (
        <React.Fragment>
            {
                newText && !isLoading ?
                    <div
                        style={{
                            fontSize: '18px',
                            color: 'var(--text-color)',
                            marginTop: 16,
                            textAlign: 'center',
                            width: '100%',
                            ...style,
                        }}
                    >
                        {newText}
                    </div>
                    :
                    <div
                        className={styles['spinner__container']}
                        style={{
                            ...style
                        }}
                    >
                        <Icon
                            addClass={'icon__rotation'}
                            width={50}
                            height={50}
                           src={settingRed}
                        />
                    </div>
            }
        </React.Fragment>
    )
}

export default memo(Spinner);