import React from "react";
import classNames from "classnames";
import styles from './styles/header.module.scss';
import { Image } from "react-native-web";
import Button from "../Button/Button";
import WrapContainer from "../WrapContainer/WrapContainer";

const Header = ({
    isBlur,
    isFocus,
    textHeader,
    buttonHeaderAction,
}) => {
    return (
        <header
            className={"main-context-header"}
            style={{
                // top: isFocus? -60 : 0
            }}
        >
            <WrapContainer
                style={{
                    filter: isBlur ? 'blur(5px)' : 'blur(0px)',
                    
                }}
            >
                <div
                    className={
                        classNames({
                            [styles['header__wrap-discription']]: true,
                        })}
                >
                    <div
                        className={styles['header__wrap-container-heaider']}
                    >
                        <p
                            className={styles['header__title']}
                        >
                            {!!textHeader && (textHeader[0].toUpperCase() + textHeader?.slice(1).toLowerCase())}
                        </p>
                        {
                            buttonHeaderAction.isVisible &&
                            <div
                                className={styles['header__action']}
                            >
                                {
                                    buttonHeaderAction.buttons.map((button, i) => {
                                        return (
                                            <Button
                                                addClass={button.className}//{'button__controll--red'}
                                                iconLeft={button?.iconLeft}
                                                style={button?.style ?? {}}
                                                styleIconsLeft={button?.styleIconsLeft}
                                                styleIconsRight={button?.styleIconsRight}
                                                onClick={button.action}
                                                iconRight={button?.iconRight}
                                                key={i}
                                            >
                                                <p
                                                >{button.title}</p>
                                            </Button>
                                        )
                                    })
                                }
                            </div>
                        }

                    </div>
                </div>
            </WrapContainer>
        </header>
    )
}

export default Header;


