import requests
import json


def get_comments(post_id):
    post_id = str(post_id)
    url = 'http://api.duoshuo.com/threads/counts.json?short_name=resolvewang&'+'threads='+post_id
    datas = json.loads(requests.get(url).text)
    counts = datas['response'][post_id]['comments']
    return counts

