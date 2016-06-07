from admin.main import app
from flask import render_template


@app.route('/admin/login', methods=['GET', 'POST'])
def login():
    return render_template('login.html')


@app.route('/admin/')
def home():
    return render_template('index.html')
