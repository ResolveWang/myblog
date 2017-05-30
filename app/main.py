from flask import Flask
from werkzeug.contrib.fixers import ProxyFix
from app.base import MySQLAlchemy

app = Flask(__name__)
app.config.from_object('config')
db = MySQLAlchemy(app)
app.config['SQLALCHEMY_ECHO'] = False
app.wsgi_app = ProxyFix(app.wsgi_app)
