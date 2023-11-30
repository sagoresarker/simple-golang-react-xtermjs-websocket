// Terminal.jsx
import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

const MyTerminal = () => {
  const terminalRef = useRef(null);
  let currLine = "";
  const entries = [];

  useEffect(() => {
    const term = new Terminal({ convertEol: true });
    term.open(terminalRef.current);
    term.write('web shell $ ');

    const socket = new WebSocket('ws://localhost:8080'); // Replace with your WebSocket server URL

    socket.onopen = () => {
      term.write('\r\nWebSocket Connection Established\r\n');
    };

    socket.onmessage = (event) => {
      const message = event.data;
      term.write(`\r\nServer Response: ${message}\r\n`);
      term.write('web shell $ ');
    };

    term.onKey(({ key, domEvent }) => {
      if (domEvent.keyCode === 13) { // Enter key
        term.write('\r\n');
        entries.push(currLine);
        // term.write(`You entered: ${currLine}\r\n`);

        // Send the entered command to the server via WebSocket
        socket.send(currLine);

        currLine = '';
        // term.write('web shell $ ');
      } else if (domEvent.keyCode === 8) { // Backspace key
        if (currLine) {
          currLine = currLine.slice(0, currLine.length - 1);
          term.write('\b \b');
        }
      } else {
        currLine += key;
        term.write(key);
      }
    });

    return () => {
      term.dispose();
      socket.close();
    };
  }, []);

  return <div ref={terminalRef} />;
};

export default MyTerminal;
