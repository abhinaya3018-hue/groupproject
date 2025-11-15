import smtplib
from email.message import EmailMessage

SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
USER = 'rredconnect@gmail.com'
PASSWORD = 'evvx srsf umdm trem'

msg = EmailMessage()
msg.set_content('Test email body')
msg['Subject'] = 'Test'
msg['From'] = USER
msg['To'] = USER

s = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
s.ehlo()
s.starttls()
s.ehlo()
try:
    s.login(USER, PASSWORD)
    s.send_message(msg)
    print("Logged in & email sent successfully")
except Exception as e:
    print("SMTP connection failed:", repr(e))
finally:
    s.quit()
