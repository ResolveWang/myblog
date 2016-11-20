import smtplib
from email.mime.text import MIMEText
from email.header import Header
from tools.get_conf import *
from tools.logger import *

__all__ = ['send_email']


def send_email(excption):
    from_addr = get_sender().get('account')
    from_pwd = get_sender().get('password')
    receiver = get_receiver()

    message = MIMEText('个人网站目前不可访问,具体异常是{e}'.format(e=excption), 'plain', 'utf-8')
    message['From'] = from_addr

    subject = '个人网站可用性提醒'
    message['Subject'] = Header(subject, 'utf-8')

    try:
        smtp_obj = smtplib.SMTP('smtp.sina.com', 25)
        smtp_obj.login(from_addr, from_pwd)
        smtp_obj.sendmail(from_addr, receiver, message.as_string())
        smtp_obj.quit()
    except smtplib.SMTPException as e:
        web_logger.error('邮件发送失败，具体异常信息是{e}'.format(e=e))
