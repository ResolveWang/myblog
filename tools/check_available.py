import time
import requests
from tools.logger import web_logger
from tools.get_conf import *
from tools.warn import send_email
from tools.decrator import notify

site_url = get_url()


@notify
def is_available():
    resp = requests.get(site_url, timeout=30)
    return True if resp.status_code == 200 else False


if __name__ == '__main__':
    while True:
        res = is_available()
        if not res:
            send_email('网站响应状态码异常')
            exit(-1)
        else:
            web_logger.info('网站运行正常')
            time.sleep(60*60*20)
