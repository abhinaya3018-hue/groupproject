import { useEffect, useState } from "react";

export default function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/notifications/");

    socket.onopen = () => console.log("✅ WebSocket connected");
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📨 Received:", data);
      setNotifications((prev) => [...prev, data.message]);
    };
    socket.onclose = (event) => {
      console.log("❌ WebSocket disconnected", event);
    };
    socket.onerror = (error) => {
      console.warn("⚠️ WS error", error);
    };

    return () => socket.close();
  }, []);

  return notifications;
}
