import requests


def get_comments(post_id):
    post_id = str(post_id)
    url = 'http://api.duoshuo.com/threads/counts.json?short_name=resolvewang&'+'threads='+post_id
    try:
        cont = requests.get(url, timeout=10)
    except Exception as e:
        print('获取多说评论超时')
        return 0
    else:
        datas = cont.json()
        resp = datas.get('response', '')
        if not resp:
            return 0
        counts = resp[post_id]['comments']
        return counts

if __name__ == '__main__':
    count = get_comments(137)
    print(count)