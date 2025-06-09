
if (False){
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
}


/*
window.addEventListener('resize', function() {
        location.reload();
    });

*/

