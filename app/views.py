from flask import render_template
from app.main import app


@app.route('/')
def index():
    return render_template('home.html', title='首页')


@app.route('/category/<string:category>')
def category_program(category):
    if category == 'program':
        bt = '编程'
    elif category == 'reading':
        bt = '读书'
    elif category == 'life':
        bt = '生活'
    else:
        return render_template('404.html')
    return render_template('type.html', title='分类', type=bt)


@app.route('/archive')
def archive():
    return render_template('archive.html', title='归档')


@app.route('/about')
def about():
    return render_template('about.html', title='关于作者')


@app.route('/detail/<string:blog_id>')
def get_detail(blog_id):
    return render_template('detail.html', title='博客题目')


@app.errorhandler(404)
def not_found(e):
    return render_template('error.html', title='404', message='你要找的页面不存在...')


@app.errorhandler(500)
def server_error(e):
    return render_template('error.html', title='500', message='服务器内部发生错误...')
