import os
import yaml

conf_abspath = os.path.abspath('.')
conf_path = os.path.join(conf_abspath, 'tools/conf.yaml')

with open(conf_path, encoding='utf-8') as f:
    conf = f.read()

cf = yaml.load(conf)

__all__ = ['get_url', 'get_db', 'get_receiver', 'get_sender']


def get_url():
    return cf.get('url')


def get_db():
    return cf.get('db')


def get_sender():
    return cf.get('sender')


def get_receiver():
    return cf.get('receiver')
