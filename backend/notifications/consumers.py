# api/consumers.py
from channels.generic.websocket import AsyncWebsocketConsumer
import json

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("✅ Client connected")
        await self.channel_layer.group_add("notifications", self.channel_name)
        await self.accept()

        # Optional test message (to verify it stays open)
        await self.send(json.dumps({"message": "Connected to Notifications"}))

    async def disconnect(self, close_code):
        print("❌ Client disconnected")
        await self.channel_layer.group_discard("notifications", self.channel_name)

    async def receive(self, text_data):
        print("📩 Message received from client:", text_data)
        await self.send(json.dumps({"message": "Echo: " + text_data}))

    async def send_notification(self, event):
        await self.send(json.dumps({
            "message": event["message"]
        }))
