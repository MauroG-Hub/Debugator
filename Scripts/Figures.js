/*
const container = document.createElement('div');
document.body.appendChild(container);
Object.assign(container.style, {
  position: 'fixed', bottom: '0', left: '0', maxHeight: '50%', overflowY: 'auto',
  background: '#fff', color: '#000', border: '1px solid #000', padding: '4px',
  fontFamily: 'monospace', fontSize: '12px', zIndex: '9999', whiteSpace: 'pre-wrap'
});

function addMessage(type, text) {
  const msg = document.createElement('div');
  msg.textContent = `[${type.toUpperCase()}] ${text}`;
  container.appendChild(msg);
}

['log', 'warn', 'error'].forEach(type => {
  const original = console[type];
  console[type] = (...args) => {
    original.apply(console, args);
    addMessage(type, args.join(' '));
  };
});

window.onerror = (msg, url, line, col) =>
  addMessage('error', `${msg} at ${url}:${line}:${col}`);

window.addEventListener('unhandledrejection', e =>
  addMessage('error', 'Unhandled Promise: ' + (e.reason?.stack || e.reason)));




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


