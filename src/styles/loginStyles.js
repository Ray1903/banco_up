// src/styles/loginStyles.js

import { StyleSheet } from 'react-native';
import COLORS from './colors';

const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.dorado,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    box: {
        backgroundColor: COLORS.blanco,
        padding: 32,
        borderRadius: 10,
        width: '85%',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.azul,
        textAlign: 'center',
        marginBottom: 24,
    },
    input: {
        backgroundColor: COLORS.grisClaro,
        padding: 16,
        borderRadius: 8,
        fontSize: 16,
        marginBottom: 16,
    },
    button: {
        backgroundColor: COLORS.dorado,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: COLORS.blanco,
        fontWeight: 'bold',
        fontSize: 16,
    },
    errorText: {
        color: COLORS.vino,
        fontSize: 14,
        marginBottom: 8,
    }
});

export default loginStyles;
