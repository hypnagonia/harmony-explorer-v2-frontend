import { io } from "socket.io-client";

const socket = io("http://64.227.121.223:3001", {
  transports: ["websocket"],
});

socket.connect();

export const transport = <T = any>(method: string, params: any[]) => {
  return new Promise<T>((resolve, reject) => {
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
