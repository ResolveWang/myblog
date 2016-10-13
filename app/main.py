from flask import Flask
from app.base import MySQLAlchemy

app = Flask(__name__)
app.config.from_object('config')
db = MySQLAlchemy(app)


