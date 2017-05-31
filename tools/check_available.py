import requests
from tools.get_conf import *
from tools.decrator import notify

site_url = get_url()


@notify
def is_available():
    resp = requests.get(site_url, timeout=30)
    return True if resp.status_code == 200 else False



