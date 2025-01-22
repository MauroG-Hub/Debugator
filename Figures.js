const Figure01 =[
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1]
  ]
  
  const Figure02 =[
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0]
  ]
  
  const Figure03 =[
    [1,1,1,1,1],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0]
  ]
  
  const Figure04 =[
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,1,1,1,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ]
  
  const Figure05 =[
    [0,0,0,0,0],
    [0,1,1,1,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,0,0,0]
  ]
  
  const Figure06 =[
    [0,0,0,0,0],
    [0,0,0,1,0],
    [0,0,0,1,0],
    [0,1,1,1,0],
    [0,0,0,0,0]
  ]
  
  const Figure07 =[
    [0,0,0,0,0],
    [0,0,0,1,0],
    [0,0,0,1,0],
    [0,0,1,1,0],
    [0,0,0,0,0]
  ]
    
  const Figure08 =[
    [0,0,0,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0],
    [0,1,1,0,0],
    [0,0,0,0,0]
  ]
  
  const Figure09 =[
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,1,1,0],
    [0,1,1,0,0],
    [0,0,0,0,0]
  ]
  
  const Figure10 =[
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,1,1,0,0],
    [0,0,1,1,0],
    [0,0,0,0,0]
  ]
  
  const Figure11 =[
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,1,1,1,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ]
    
  const Figure12 =[
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,1,1,1,0],
    [0,0,1,0,0],
    [0,0,0,0,0]
  ]
  
  const Figure13 =[
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,0,0,0]
  ]
  
  
  const Figure14 =[
    [0,0,0,0,0],
    [0,1,1,0,0],
    [0,1,1,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ]
  
  const Figure15 =[
    [0,0,0,0,0],
    [0,1,1,1,0],
    [0,1,1,1,0],
    [0,1,1,1,0],
    [0,0,0,0,0]
  ]

  const Figure16 =[
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,1,1,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ]

  const Figure17 =[
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ]
  
  const Figure18 =[
    [0,0,0,0,0],
    [0,1,1,0,0],
    [0,1,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ]
  
  const Figure19 =[
    [0,0,0,0,0],
    [0,1,1,1,0],
    [0,1,0,1,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ]

  const Figure20 =[
    [0,1,1,1,0],
    [0,0,0,1,0],
    [0,1,1,1,0],
    [0,1,0,0,0],
    [0,1,1,1,0]
  ]

  const Figure21 =[
    [0,1,1,1,0],
    [0,1,0,0,0],
    [0,1,1,1,0],
    [0,0,0,1,0],
    [0,1,1,1,0]
  ]

  const Figure22 =[
    [0,1,1,1,0],
    [0,1,0,0,0],
    [0,1,1,1,0],
    [0,1,0,0,0],
    [0,1,1,1,0]
  ]


  function getFigureName(number) {
    try {
        // Generate the figure name based on the number
        const figureName = `Figure${String(number).padStart(2, '0')}`;
        // Attempt to retrieve the corresponding constant using eval
        const figure = eval(figureName); // Note: Only use eval if the content is safe

        if (!figure) {
            throw new Error(`The figure with number ${number} does not exist.`);
        }
        return figureName;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return `Unable to get figure name: ${error.message}`;
    }
}
  
function getFigureValues(number) {
  const figureName = getFigureName(number);
  return eval(figureName);
}

function countOnesInFigure(numero) {
  try {
      const nombreFigura = getFigureName(numero);
      const figura = eval(nombreFigura); // Nota: eval solo debe usarse si el contenido es seguro


      // Contar los unos
      const cuenta = figura.flat().filter(num => num === 1).length;

      return cuenta;

  } catch (error) {
      console.error(`Error: ${error.message}`);
      return `No se pudo calcular la cantidad de unos: ${error.message}`;
  }
}


