import { io } from "socket.io-client";

// todo to .env file and config object
// const url = "https://ws.explorer-v2.hmny.io"
const url = 'ws://localhost:3001'
const socket = io(url, {
  transports: ["websocket"],
});

socket.connect();

export const transport = (method: string, params: any[]) => {
  return new Promise((resolve, reject) => {
    socket.emit(method, params, (res: any) => {
      try {
        const payload = JSON.parse(res.payload);

        if (res.event === "Response") {
          resolve(payload);
        } else {
          reject(payload);
        }
      } catch (err) {
        reject(null);
      }
    });
  });
};
