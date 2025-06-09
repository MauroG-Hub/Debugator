

//nst figurePriorities     = /*[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];*/


const figurePrioritiesLevels = [
  /*[1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22];*/
    [5, 8, 8, 8, 6, 8, 3, 8, 5, 8, 8, 8, 6, 6, 3, 3, 5, 0, 0, 0, 0, 0], // Level 1
    [5, 8, 7, 7, 6, 8, 3, 8, 5, 8, 8, 8, 6, 6, 3, 3, 5, 0, 0, 0, 0, 1], // Level 2
    [5, 8, 6, 6, 6, 8, 3, 8, 5, 8, 8, 8, 6, 6, 3, 3, 5, 2, 0, 0, 0, 2], // Level 3
    [5, 7, 5, 5, 6, 7, 3, 7, 5, 7, 7, 7, 6, 6, 3, 3, 5, 3, 3, 0, 0, 3], // Level 4
    [5, 6, 4, 4, 6, 6, 3, 6, 5, 6, 6, 6, 6, 6, 3, 3, 5, 4, 4, 4, 0, 4], // Level 5
    [5, 5, 3, 3, 5, 5, 3, 5, 5, 5, 5, 5, 5, 5, 3, 3, 5, 5, 5, 5, 5, 5], // Level 6
    [4, 4, 3, 3, 4, 4, 3, 4, 4, 4, 4, 4, 4, 4, 3, 3, 4, 6, 6, 6, 6, 6], // Level 7
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7, 7, 7, 7, 7], // Level 8
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 8, 8, 8, 8], // Level 9
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 9, 9, 9, 9]  // Level 10
];

  const Figure00 =[
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ]


   const Figure01 =[
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ]
  
   const Figure02 =[
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,1,1,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ]
  
   const Figure03 =[
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,1,1,1,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ]
  
   const Figure04 =[
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,0,0,0]
  ]
  
  const Figure05 =[
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0]
  ]
  
   const Figure06 =[
    [0,0,0,0,0],
    [0,1,1,0,0],
    [0,1,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ]
  
  const Figure07 =[
    [0,0,0,0,0],
    [0,1,1,0,0],
    [0,1,1,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ]
  
  const Figure08 =[
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,1,1,1,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ]
  
  const Figure09 =[
    [0,0,0,0,0],
    [0,1,1,1,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,0,0,0]
  ]
  
  const Figure10 =[
    [0,0,0,0,0],
    [0,0,0,1,0],
    [0,0,0,1,0],
    [0,1,1,1,0],
    [0,0,0,0,0]
  ]
  
  const Figure11 =[
    [0,0,0,0,0],
    [0,0,0,1,0],
    [0,0,0,1,0],
    [0,0,1,1,0],
    [0,0,0,0,0]
  ]
    
  const Figure12 =[
    [0,0,0,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0],
    [0,1,1,0,0],
    [0,0,0,0,0]
  ]
  
  const Figure13 =[
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,1,1,0],
    [0,1,1,0,0],
    [0,0,0,0,0]
  ]
  
  const Figure14 =[
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,1,1,0,0],
    [0,0,1,1,0],
    [0,0,0,0,0]
  ]
 
    
  const Figure15 =[
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,1,1,1,0],
    [0,0,1,0,0],
    [0,0,0,0,0]
  ]
  
  const Figure16 =[
    [0,0,0,0,0],
    [0,1,1,1,0],
    [0,1,1,1,0],
    [0,1,1,1,0],
    [0,0,0,0,0]
  ]

  
  const Figure17 =[
    [0,0,0,0,0],
    [0,1,1,1,0],
    [0,1,0,1,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ]

  const Figure18 =[
    [0,1,1,1,0],
    [0,0,0,1,0],
    [0,1,1,1,0],
    [0,1,0,0,0],
    [0,1,1,1,0]
  ]

  const Figure19 =[
    [0,1,1,1,0],
    [0,1,0,0,0],
    [0,1,1,1,0],
    [0,0,0,1,0],
    [0,1,1,1,0]
  ]

  const Figure20 =[
    [0,1,1,1,0],
    [0,1,0,0,0],
    [0,1,1,1,0],
    [0,1,0,0,0],
    [0,1,1,1,0]
  ]
  
  const Figure21 =[
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1]
  ]
  
   const Figure22 =[
    [1,1,1,1,1],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0]
  ]


function getFigureName(number) {
    try {
        // Generate the figure name by padding the number with leading zeros (e.g., 3 -> "Figure03")
        const figureName = `Figure${String(number).padStart(2, '0')}`;

        // Attempt to retrieve the figure constant by evaluating its name (dangerous if not controlled)
        const figure = eval(figureName); // Note: Only use eval if the content is safe

        // If the figure does not exist, throw an error
        if (!figure) {
            throw new Error(`The figure with number ${number} does not exist.`);
        }
        // Return the generated figure name
        return figureName;
    } catch (error) {
        // Log the error message to the console
        console.error(`Error: ${error.message}`);
        // Return a string describing the failure to get the figure name
        return `Unable to get figure name: ${error.message}`;
    }
}

function getFigureValues(number) {
  // Get the figure name string using the provided number
  const figureName = getFigureName(number);

  // Retrieve the value of the variable with the name figureName (using eval)
  return eval(figureName);
}


function countOnesInFigure(numero) {
  try {
      // Get the figure name string using the provided number
      const nombreFigura = getFigureName(numero);

      // Retrieve the figure array/object using eval (only if safe)
      const figura = eval(nombreFigura); // Note: eval should only be used if the content is safe

      // Count the number of ones in the figure by flattening the array and filtering for 1's
      const cuenta = figura.flat().filter(num => num === 1).length;

      // Return the count of ones
      return cuenta;

  } catch (error) {
      // Log the error message to the console
      console.error(`Error: ${error.message}`);

      // Return a string indicating the calculation failed
      return `No se pudo calcular la cantidad de unos: ${error.message}`;
  }
}


