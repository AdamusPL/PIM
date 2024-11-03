import { StyleSheet, View } from "react-native";
import { TextInput, Text } from 'react-native-paper';
import React, { useEffect } from "react";
import { useState } from "react";
import { convertHexToRGB, convertHSVToRGB, convertRGBToCMYK, convertRGBToHex, convertRGBToHSV, convertCMYKToRGB } from "./Calculator";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Values() {

    //r,g,b
    const [r, setR] = useState("0");
    const [g, setG] = useState("0");
    const [b, setB] = useState("0");

    //h,s,v
    const [h, setH] = useState("0");
    const [s, setS] = useState("0");
    const [v, setV] = useState("0");

    //c,m,y,k
    const [c, setC] = useState("0");
    const [m, setM] = useState("0");
    const [y, setY] = useState("0");
    const [k, setK] = useState("0");

    //hex
    const [hex, setHex] = useState("000000");

    function handleRGBChange(input, label) {
        let hsv = {};
        let cmyk = {};
        let hex = "";

        switch (label) {
            case 'r':
                hsv = convertRGBToHSV(input, g, b);
                cmyk = convertRGBToCMYK(input, g, b);
                hex = convertRGBToHex(input, g, b);
                setR(input);
                break;
            case 'g':
                hsv = convertRGBToHSV(r, input, b);
                cmyk = convertRGBToCMYK(r, input, b);
                hex = convertRGBToHex(r, input, b);
                setG(input);
                break;
            case 'b':
                hsv = convertRGBToHSV(r, g, input);
                cmyk = convertRGBToCMYK(r, g, input);
                hex = convertRGBToHex(r, g, input);
                setB(input);
                break;
        }

        setH(hsv.h);
        setS(hsv.s);
        setV(hsv.v);

        setC(cmyk.c);
        setM(cmyk.m);
        setY(cmyk.y);
        setK(cmyk.k);

        setHex(hex);
    }

    function handleHSVChange(input, label) {

        let rgb = {};
        let cmyk = {};
        let hex = "";

        switch (label) {
            case 'h':
                rgb = convertHSVToRGB(input, s, v);
                setH(input);
                break;
            case 's':
                rgb = convertHSVToRGB(h, input, v);
                setS(input);
                break;
            case 'v':
                rgb = convertHSVToRGB(h, s, input);
                setV(input);
                break;
        }

        cmyk = convertRGBToCMYK(rgb.r, rgb.g, rgb.b);
        hex = convertRGBToHex(rgb.r, rgb.g, rgb.b);

        setR(rgb.r);
        setG(rgb.g);
        setB(rgb.b);

        setC(cmyk.c);
        setM(cmyk.m);
        setY(cmyk.y);
        setK(cmyk.k);

        setHex(hex);
    }

    function handleCMYKChange(input, label) {
        let rgb = {};
        let hsv = {};
        let hex = "";

        switch (label) {
            case 'c':
                rgb = convertCMYKToRGB(input, m, y, k);
                setC(input);
                break;
            case 'm':
                rgb = convertCMYKToRGB(c, input, y, k);
                setM(input);
                break;
            case 'y':
                rgb = convertCMYKToRGB(c, m, input, k);
                setY(input);
                break;
            case 'k':
                rgb = convertCMYKToRGB(c, m, y, input);
                setK(input);
                break;
        }

        hsv = convertRGBToHSV(rgb.r, rgb.g, rgb.b);
        hex = convertRGBToHex(rgb.r, rgb.g, rgb.b);

        setR(rgb.r);
        setG(rgb.g);
        setB(rgb.b);

        setH(hsv.h);
        setS(hsv.s);
        setV(hsv.v);

        setHex(hex);
    }

    function handleHexChange(input) {
        const rgb = convertHexToRGB(input);
        const hsv = convertRGBToHSV(rgb.r, rgb.g, rgb.b);
        const cmyk = convertRGBToCMYK(rgb.r, rgb.g, rgb.b);
        setHex(input);

        setR(rgb.r);
        setG(rgb.g);
        setB(rgb.b);

        setH(hsv.h);
        setS(hsv.s);
        setV(hsv.v);

        setC(cmyk.c);
        setM(cmyk.m);
        setY(cmyk.y);
        setK(cmyk.k);
    }

    return (<>
        <KeyboardAwareScrollView>
            <View style={styles.body}>
                <Text style={styles.title} variant="titleLarge">Color picker</Text>
                <View style={[styles.square, { backgroundColor: `rgb(${r},${g},${b})` }]}></View>
            </View>

            <View style={styles.fields}>
                <View style={styles.container}>
                    <TextInput style={styles.input}
                        label="R"
                        value={r}
                        keyboardType="numeric"
                        maxLength={3}
                        onChangeText={x => handleRGBChange(x, 'r')}
                    />
                    <TextInput style={styles.input}
                        label="G"
                        value={g}
                        keyboardType="numeric"
                        maxLength={3}
                        onChangeText={x => handleRGBChange(x, 'g')}
                    />
                    <TextInput style={styles.input}
                        label="B"
                        value={b}
                        keyboardType="numeric"
                        maxLength={3}
                        onChangeText={x => handleRGBChange(x, 'b')}
                    />
                </View>

                <View style={styles.container}>
                    <TextInput style={styles.input}
                        label="H"
                        value={h}
                        keyboardType="numeric"
                        maxLength={3}
                        onChangeText={x => handleHSVChange(x, 'h')}
                        right={<TextInput.Affix text="°" />}
                    />
                    <TextInput style={styles.input}
                        label="S"
                        value={s}
                        keyboardType="numeric"
                        maxLength={3}
                        onChangeText={x => handleHSVChange(x, 's')}
                        right={<TextInput.Affix text="%" />}
                    />
                    <TextInput style={styles.input}
                        label="V"
                        value={v}
                        keyboardType="numeric"
                        maxLength={3}
                        onChangeText={x => handleHSVChange(x, 'v')}
                        right={<TextInput.Affix text="%" />}
                    />
                </View>

                <View style={styles.container}>
                    <TextInput style={styles.input}
                        label="C"
                        value={c}
                        keyboardType="numeric"
                        maxLength={3}
                        onChangeText={x => handleCMYKChange(x, 'c')}
                        right={<TextInput.Affix text="%" />}
                    />
                    <TextInput style={styles.input}
                        label="M"
                        value={m}
                        keyboardType="numeric"
                        maxLength={3}
                        onChangeText={x => handleCMYKChange(x, 'm')}
                        right={<TextInput.Affix text="%" />}
                    />
                    <TextInput style={styles.input}
                        label="Y"
                        value={y}
                        keyboardType="numeric"
                        maxLength={3}
                        onChangeText={x => handleCMYKChange(x, 'y')}
                        right={<TextInput.Affix text="%" />}
                    />
                    <TextInput style={styles.input}
                        label="K"
                        value={k}
                        keyboardType="numeric"
                        maxLength={3}
                        onChangeText={x => handleCMYKChange(x, 'k')}
                        right={<TextInput.Affix text="%" />}
                    />
                </View>

                <View style={styles.container}>
                    <TextInput style={styles.input}
                        label="Hex"
                        value={hex}
                        maxLength={6}
                        onChangeText={handleHexChange}
                        left={<TextInput.Affix text="#" />}
                    />
                </View>
            </View>
        </KeyboardAwareScrollView>
    </>)
}

const styles = StyleSheet.create({
    body: {
        marginLeft: 15,
        marginRight: 15
    },

    fields: {
        marginLeft: 5,
        marginRight: 5
    },

    title: {
        marginTop: 30,
    },

    container: {
        flexDirection: 'row',
        marginTop: 15
    },

    input: {
        flex: 1,
        marginHorizontal: 5
    },

    square: {
        width: 375,
        height: 375,
        marginTop: 30
    }
})