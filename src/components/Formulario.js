import React, {useState} from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { obtenerDiferenciaYear, calcularMarca, obternerPlan} from '../helper';



const Campo = styled.div`
    display:flex;
    margin-bottom: 1rem;
    align-items:center; //para que centre verticalmente
`;

//como el padre (Campo) tiene displayflex, le pondemos aplicar una prop de flexbox
const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none; //le quita la apariencia "natural" al select para poderle pasar un border
`;

const InputRadio = styled.input`
    margin: 0 1rem;
`;

const Boton = styled.button`
    background-color: #00838F;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    border: none; //por defecto tienen borde
    transition: background-color .3s ease;
    margin-top: 2rem;

    //esto mas al estilo de sass en vez de div: hover{}
    &:hover { //& hace ref al mismo elemento
        background-color: #26C6DA;
        cursor: pointer;
    }
`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 100%;
    text-align:center;
    margin-bottom: 2rem;
`;

const Formulario = ({guardarResumen, guardarCargando}) => {
    const [ datos, guardarDatos ] = useState({
        marca: '',
        year: '',
        plan: ''
    });

    const [ error, guardarError] = useState(false);

    //extrar los valores del state
    const { marca, year, plan } = datos;

    // Leer los datos del formulario y colocarlos en el state
    const obtenerInformacion = e => {
        guardarDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const cotizarSeguro = e => {
        e.preventDefault();

        if(marca.trim() === '' || year.trim() === '' || plan.trim() === ''){
            guardarError(true);
            return;
        }
    
        guardarError(false);

        // Iniciamos con una base de 2000
        let resultado = 2000;

        // Obtener la diferencia de de años
        const diferencia = obtenerDiferenciaYear(year);
        
        // Por cada año se resta 3%
        resultado -= (( diferencia * 3) * resultado) / 100;
        
        // Americano potenciador 15%, Europeo 30%, Asiatico 5%
        resultado = calcularMarca(marca) * resultado;
        
        // Basico aument 20% Compreto 50%
        resultado = parseFloat(obternerPlan(plan) * resultado).toFixed(2);//que nomas se optengas dos dig depues del punto
        console.log(resultado);

        // Total
        guardarCargando(true); //spinner

        setTimeout(() => {

            guardarCargando(false); //elimina el sppinner

            guardarResumen({ //funcion de useState de App.js que viene como prop y pasa la unfo al comp principal (app.js)
                cotizacion: Number(resultado),
                datos
            });
        }, 3000);
        
        
    }

    return ( 
        <form
            onSubmit={cotizarSeguro}
        >
            { error ? <Error> Todos los campos son obligatorios</Error> : null}
            <Campo>
                <Label>Marca</Label>
                <Select
                    name="marca"
                    value={marca}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Año</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Plan</Label>
                <InputRadio
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === "basico"} //ojo aqui
                    onChange={obtenerInformacion}
                />Basico

                <InputRadio
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === "completo"}
                    onChange={obtenerInformacion}
                />Completo
                {/* Tienen que tener el mismo name para que solo se pueda seleccionar uno u otro*/}
            </Campo>
            <Boton type="submit">Cotizar</Boton>
            {/* styled componen viene solo a remplazar etiquetas type="button queda igual" */}
        </form>
     );
}

Formulario.protoType = {
    guardarResumen: PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired
}
 
export default Formulario;