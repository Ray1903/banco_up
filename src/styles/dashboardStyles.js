// src/styles/dashboardStyles.js

import { StyleSheet } from 'react-native';
import COLORS from './colors';

const dashboardStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.blanco,
        padding: 24,
    },
    saldoTitulo: {
        fontSize: 16,
        color: COLORS.grisMedio,
    },
    saldoMonto: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.azul,
        marginVertical: 8,
    },
    botonTransferir: {
        backgroundColor: COLORS.dorado,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 32,
    },
    textoBoton: {
        color: COLORS.blanco,
        fontWeight: 'bold',
        fontSize: 16,
    },
    tituloSeccion: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.azul,
        marginBottom: 16,
    },
    tarjetaTransaccion: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: COLORS.grisClaro,
        borderRadius: 10,
        marginBottom: 12,
    },
    iconoCircular: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 16,
    },
    txTitulo: {
        fontWeight: 'bold',
        fontSize: 16,
        color: COLORS.grisOscuro,
    },
    txDetalle: {
        fontSize: 14,
        color: COLORS.grisMedio,
    },
});

export default dashboardStyles;
