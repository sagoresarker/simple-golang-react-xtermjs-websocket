```javascript
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = function(event) {
  console.log('WebSocket Connection Opened:', event);
};

socket.onmessage = function(event) {
  console.log('WebSocket Message Received:', event.data);
};

socket.onclose = function(event) {
  console.log('WebSocket Connection Closed:', event);
};


// Send "create" request
socket.send('create');

// Send "update" request
socket.send('update');

// Send "delete" request
socket.send('delete');

```





