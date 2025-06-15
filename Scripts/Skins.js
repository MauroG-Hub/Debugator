let currentSkin = 'pasto'; // puedes cambiarlo en tiempo real



function getSkin(name) {
  switch (name) {
    case 'pasto':
      return {
        backgroundColor: '#7ec77b',
        wallColor: '#4a3d26',
        lineWidth: 2
      };

    case 'nieve':
      return {
        backgroundColor: '#e8f9ff',
        wallColor: '#b0c4de',
        lineWidth: 1.5
      };

    case 'desierto':
      return {
        backgroundColor: '#f4e7c5',
        wallColor: '#d2b48c',
        lineWidth: 2
      };

    default: // skin por defecto
      return {
        backgroundColor: '#ffffff',
        wallColor: '#000000',
        lineWidth: 2
      };
  }
}