
import json
import typing
import logging
import smtplib
from email.mime.text import MIMEText
from http.server import BaseHTTPRequestHandler, HTTPServer


class FormData(typing.NamedTuple):
    name: str
    email: str
    message: str


def send_email(form_data: FormData):
    # Here you should change according to your preferences
    sender_email = "alexdeepwork@gmail.com"
    sender_password = "ucbm gfjm uoob hkxo"
    recipient_email = "layok91799@ibtrades.com"
    subject = "From the Gurov's website"
    body = f"""
    <html>
    <body>
        <h3>Hello from <b>Gurov's portfolio</h3>
        <p><b>Name:</b> {form_data.name}</p>
        <p><b>Email:</b> {form_data.email}</p>
        <p><b>Message:</b></p>
        <p>{form_data.message}</p>
    </body>
    </html>
    """
    # The end
    html_message = MIMEText(body, 'html')
    html_message['Subject'] = subject
    html_message['From'] = sender_email
    html_message['To'] = recipient_email
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, recipient_email, html_message.as_string())


class MailerHttpHandler(BaseHTTPRequestHandler):
    def _set_response(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.send_header('Access-Control-Allow-Origin', 'http://localhost:3000')
        self.send_header('Access-Control-Allow-Methods', 'POST')
        self.end_headers()

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = json.loads(self.rfile.read(content_length))
        logging.info(f"POST request,\nPath: {str(self.path)}\nHeaders:\n{str(self.headers)}Body: {post_data}\n")
        self._set_response()
        self.wfile.write(f"POST request for {str(self.path)}".encode('utf-8'))
        if post_data and str(self.path) == '/mailer':
            logging.info(f"Sending email......................\n")
            send_email(FormData(**post_data))
        

def run(server_class=HTTPServer, handler_class=MailerHttpHandler, port=8000):
    logging.basicConfig(level=logging.INFO)
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    logging.info('Starting httpd...\n')
    httpd.serve_forever()
    httpd.server_close()
    logging.info('Stopping httpd...\n')


if __name__ == '__main__':
    run()
