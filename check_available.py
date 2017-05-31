import time
from tools.logger import web_logger
from tools.check_available import is_available
from tools.warn import send_email

if __name__ == '__main__':
    while True:
        res = is_available()
        if not res:
            send_email('网站响应异常')
            exit(-1)

        web_logger.info('当前站点运行正常')
        time.sleep(60*60*20)