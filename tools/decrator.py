from functools import wraps
from tools.warn import send_email
from tools.logger import *


def notify(func):
    @wraps(func)
    def send_email_or_not():
        try:
            return func()
        except Exception as e:
            send_email(e)
            web_logger.error(e)
            return False

    return send_email_or_not
