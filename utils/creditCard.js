
export const agregarCaracter = (cadena, caracter, pasos) => {
  let cadenaConCaracteres = "";
  const longitudCadena = cadena.length;
  for (let i = 0; i < longitudCadena; i += pasos) {
    if (i + pasos < longitudCadena) {
      cadenaConCaracteres += cadena.substring(i, i + pasos) + caracter;
    } else {
      cadenaConCaracteres += cadena.substring(i, longitudCadena);
    }
  }
  return cadenaConCaracteres;
}