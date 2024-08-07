import React from "react";
import { useStoreon } from "storeon/react";
import WrapContainer from "./WrapContainer";

export const WrapIsFocusInput = ({
children
}) => {
const { isFocus } = useStoreon('isFocus');
console.log({isFocus})
    return (
        <WrapContainer>
        {
            isFocus?
                <div
                    style={{
                        position: 'fixed',
                        width: '100%',
                        zIndex: 9999,
                        backgroundColor: '#fff'
                    }}
                >
                    {children}
                </div>
                : <div
                        style={{
                            position: 'relative',
                        }}
                    >
                        {children}
                    </div>

        }
        </WrapContainer>
    )
}
