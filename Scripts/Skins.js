let currentSkin = 'pasto'; // puedes cambiarlo en tiempo real



function getSkin(name) {
  switch (name) {
    case 'pasto':
      return {
        backgroundColor: '#ffffff', // color del camino
        wallStyle: grassPattern.ready ? grassPattern.pattern : '#228B22',
        wallWidth: 6
      };

    case 'nieve':
      return {
        backgroundColor: '#f0f8ff',
        wallStyle: '#b0c4de',
        wallWidth: 4
      };

    case 'desierto':
      return {
        backgroundColor: '#fff8dc',
        wallStyle: '#c2a770',
        wallWidth: 5
      };

    default:
      return {
        backgroundColor: '#ffffff',
        wallStyle: '#000000',
        wallWidth: 2
      };
  }
}