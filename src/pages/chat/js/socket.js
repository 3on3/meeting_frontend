const TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJhdXRoIjoiQ09NTU9OIiwiaWQiOiJtX21pbWlAbmF2ZXIuY29tIiwiaXNzIjoibWVldGluZ1Byb3ZpZGVyS2V5IiwiaWF0IjoxNzIyOTAyODg5LCJleHAiOjE3MjI5ODkyODksInN1YiI6Ijg4MDYwOTM3LTUzMmEtNGYwNC04MWZmLTJiMWQxY2ExM2JlOCJ9.sXuJBQjuUUDq-W1NYzvlE4W7-5I-aRGGZgoa6-E9OxBSaYLlmzBv3-hGpF4H3B4y76zpH_izj09-k8-Ppa4IFQ"

const socket = new WebSocket('ws://localhost:8253/chat/websocket?token='+TOKEN);

// 연결이 열릴 때
socket.onopen = function(event) {
    console.log('WebSocket is open now.');
};

// 서버로부터 메시지를 받을 때
socket.onmessage = function(event) {
    console.log('Received:', event.data);
};

// 연결이 닫힐 때
socket.onclose = function(event) {
    console.log('WebSocket is closed now.');
};

// 에러가 발생할 때
socket.onerror = function(error) {
    console.error('WebSocket error:', error);
};
