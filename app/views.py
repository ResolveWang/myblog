import time
from html.parser import unescape
from flask import render_template, request
from app.main import app
from gl import page_per_limit
from app.models import Post


@app.route('/')
@app.route('/index')
def index():
    page_num = request.args.get('page_num')
    if not page_num or int(page_num) < 1:
        page_num = 1
    paginate = Post.query.order_by(Post.post_time.desc()).paginate(int(page_num), page_per_limit, True)
    posts = paginate.items
    for p in posts:
        p.post_time = time.strftime('%Y-%m-%d', time.localtime(p.post_time))
        p.content = unescape(p.content)
    return render_template('home.html', title='首页',  posts=posts, pagination=paginate)


@app.route('/detail/<int:pid>')
def get_detail(pid):
    post = Post.query.filter_by(id=pid).first_or_404()
    pre_post = Post.query.order_by(Post.id.desc()).filter(Post.id < pid).first()
    next_post = Post.query.order_by(Post.id.asc()).filter(Post.id > pid).first()
    post.post_time = time.strftime('%Y-%m-%d', time.localtime(post.post_time))
    post.content = unescape(post.content)
    return render_template('detail.html', p=post, pre_post=pre_post, next_post=next_post)


@app.route('/category/<int:cid>/page/<int:page_num>')
def get_bycategory(cid, page_num):
    if not page_num or int(page_num) < 1:
        page_num = 1
    paginate = Post.query.order_by(Post.post_time.desc()).filter_by(category_id=cid).paginate(int(page_num),
                                                                                              page_per_limit, True)
    posts = paginate.items
    for p in posts:
        p.post_time = time.strftime('%Y-%m-%d', time.localtime(p.post_time))
        p.content = unescape(p.content)
    return render_template('type.html', title='分类', posts=posts, pagination=paginate, cid=cid)


@app.route('/archive')
def archive():
    return render_template('archive.html', title='归档')


@app.route('/about')
def about():
    return render_template('about.html', title='关于作者')


@app.errorhandler(404)
def not_found(e):
    return render_template('error.html', title='404', message='你要找的页面不存在...')


@app.errorhandler(500)
def server_error(e):
    return render_template('error.html', title='500', message='服务器内部发生错误...')
