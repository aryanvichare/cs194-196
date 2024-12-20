import { WebSocketServer } from 'ws';
import { EmergencyResponseSystem } from '../lib/autogen/system';

const wss = new WebSocketServer({ port: 8080 });
const system = new EmergencyResponseSystem();

wss.on('connection', (ws) => {
  ws.on('message', async (message) => {
    const data = JSON.parse(message.toString());
    const result = await system.processEmergency(data);
    ws.send(JSON.stringify(result));
  });
});