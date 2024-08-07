import { useEffect, useState } from "react";
import { Picker, StyleSheet, View } from "react-native-web";

const NativeSelect = ({
    pt = 0,
    pb = 0,
    pl = 11,
    pr = 5,
    mt,
    mb,
    ml,
    mr,
    id,
    data = [],
    name = 'select',
    width,
    style,
    height = 45,
    onBlur = () => { },
    enabled = true,
    onChange,
    helptext = '',
    styleWrap = {},
    placeholder,
    selectedValue,
    stylehelptext = {},
    letterSpacing = 0,
}) => {
    let [newData, setNewData] = useState([])    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            // marginHorizontal: 16,
            height: height,
            borderRadius: 7,
            paddingTop: pt,
            paddingBottom: pb,
            paddingLeft: pl,
            paddingRight: pr,
            marginTop: mt,
            marginBottom: mb,
            marginLeft: ml,
            marginRight: mr,
            fontWeight: 500,
            fontFamily: 'HelveticaNeue',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--background-color-block)',
            filter: `blur(var(--filter-blur))`,
            ...styleWrap
        },
        item: {
            backgroundColor: '#f9c2ff',
            padding: 20,
            marginVertical: 8,
        },
        header: {
            fontSize: 32,
            backgroundColor: '#fff',
        },
        title: {
            fontSize: 24,
        },
    });
    useEffect(()=>{
        setNewData([
        {
            title: placeholder ?? "сделайте выбор",
            value: 0,
        },
        ...data,
        ]);
    },[data, placeholder])
    
    return (
        <View style={styles.container}>
            <Picker
                enabled={enabled}
                selectedValue={selectedValue ?? 'select'}
                // onBlur={onBlur}
                name={name}
                id={id}
                onFocus={e=>console.log({e})}
                onBlur={e=>{
                    onBlur(e)
                    console.log({e})}
                }
                style={{
                    height: height,
                    width: width ?? '100%',
                    borderRadius: 8,
                    fontWeight: 500,
                    fontFamily: 'HelveticaNeue',
                    color: `var(--text-color)`,
                    fontSize: 12,
                    letterSpacing: letterSpacing,
                    pointerEvents: enabled? 'all' : 'none',
                    ...style
                }}
                onValueChange={(itemValue, itemIndex) => {
                    onChange(itemValue)
                }
                }
            >
                {
                    newData.length?
                    newData.map((el, index) => {
                        return (
                            <Picker.Item
                                key={`${el.value}-${index}`}
                                style={{
                                    color: `var(--placeholder-color)`
                                }}
                                label={el.title}
                                value={el.value}
                            />
                        )
                    })
                    : null
                }
            </Picker>
            {
                helptext ?
                    <div
                        style={{
                            position: 'absolute',
                            bottom: -18,
                            left: 0,
                            ...stylehelptext
                        }}
                    >
                        {helptext}
                    </div>
                    : null
            }
        </View>
    )
}

export default NativeSelect;