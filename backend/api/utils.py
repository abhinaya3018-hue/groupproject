import requests

def send_sms_notification(phone_number, message):
    """
    Example SMS sender function.
    Replace this with your actual SMS API integration.
    """
    print(f"📱 Sending SMS to {phone_number}: {message}")

    # Example of using a real SMS API (like Twilio, Fast2SMS, etc.)
    # response = requests.post("https://sms-provider.com/api/send", data={
    #     "to": phone_number,
    #     "message": message,
    #     "api_key": "YOUR_API_KEY"
    # })
    # return response.status_code

    return True  # simulate success
