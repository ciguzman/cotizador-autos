import React from 'react';
import styled from '@emotion/styled';
import {primerMayuscula} from '../helper';
import PropTypes from 'prop-types';


const ContenedorResumen = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #00838F;
    color: #FFFF;
    margin-top: 1rem;
`;

const Resumen = ({datos}) => {

    // extraer de datos
    const {marca, year, plan} = datos;

    // esto para no tener tantos ternarios en el App.js
    if(marca === '' || year === ''  || plan === '' ) return null;

    return ( 
        <ContenedorResumen>
            <h2>Resumen Cotizacion</h2>
            <ul>
                <li>Marca: {primerMayuscula(marca)}</li>
                <li>Plan: {primerMayuscula(plan)} </li>
                <li>Año del Auto: {year} </li>
            </ul>
        </ContenedorResumen>
        
     );
}

Resumen.protoType = {
    datos: PropTypes.object.isRequired,
}
 
export default Resumen;