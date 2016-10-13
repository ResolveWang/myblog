import time
from html.parser import unescape
from flask import render_template, request, jsonify, make_response
from sqlalchemy import and_
from app.main import app, db
import gl
from app.utils import get_comments
from app.models import Post, Tag, PostTag


@app.route('/')
@app.route('/index')
def index():
    page_num = request.args.get('page_num')
    if not page_num or int(page_num) < 1:
        page_num = 1
    paginate = Post.query.filter_by(status=1).filter_by(stype=1).filter(Post.category_id > 0).\
        order_by(Post.post_time.desc()).paginate(int(page_num), gl.index_page_limit, True)
    posts = paginate.items
    for p in posts:
        p.comment_counts = get_comments(p.id)
        p.post_time = str(time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(p.post_time))[0:-9])
        p.content = unescape(p.content)
    hot_posts = _get_hot()
    tags = _get_tags()
    return render_template('home.html', title='首页',  posts=posts, pagination=paginate, hot=hot_posts, tags=tags)


@app.route('/detail/<int:pid>')
def get_detail(pid):
    post = Post.query.filter_by(id=pid).filter_by(status=1).filter_by(stype=1).filter(Post.category_id > 0).\
        first_or_404()
    post.view_counts += 1
    db.session.commit()
    pre_post = Post.query.order_by(Post.id.desc()).filter_by(status=1).filter_by(stype=1).filter(Post.id < pid).first()
    next_post = Post.query.order_by(Post.id.asc()).filter(Post.id > pid).filter_by(status=1).filter_by(stype=1).first()
    post.post_time = time.strftime('%Y-%m-%d', time.localtime(post.post_time))
    post.comment_counts = get_comments(post.id)
    post.content = unescape(post.content)
    hot = _get_hot()
    tags = _get_tags()
    return render_template('detail.html', p=post, pre_post=pre_post, next_post=next_post, hot=hot, tags=tags)


@app.route('/category/<int:cid>/page/<int:page_num>')
def get_bycategory(cid, page_num):
    if not page_num or int(page_num) < 1:
        page_num = 1
    paginate = Post.query.order_by(Post.post_time.desc()).filter_by(stype=1).filter_by(category_id=cid).\
        filter_by(status=1).paginate(int(page_num), gl.index_page_limit, True)
    posts = paginate.items
    for p in posts:
        p.comment_counts = get_comments(p.id)
        p.post_time = time.strftime('%Y-%m-%d', time.localtime(p.post_time))
        p.content = unescape(p.content)
    hot = _get_hot()
    tags = _get_tags()
    return render_template('type.html', title='分类', posts=posts, pagination=paginate, cid=cid, hot=hot, tags=tags)


@app.route('/archive')
def archive():
    page_num = request.args.get('page_num')
    if not page_num or int(page_num) < 1:
        page_num = 1
    paginate = Post.query.filter_by(status=1).filter_by(stype=1).filter(Post.category_id > 0).\
        order_by(Post.post_time.desc()).paginate(int(page_num), gl.archive_page_limit, True)
    posts = paginate.items
    datas = []
    flag = ''
    for post in posts:
        post.comment_counts = get_comments(post.id)
        post.post_time = time.strftime('%Y-%m-%d', time.localtime(post.post_time))
        year = post.post_time[0:4]
        if year != flag:
            flag = year
            datas.append({'post': post, 'year': year})
        else:
            datas.append({'post': post, 'year': ''})
    hot_posts = _get_hot()
    tags = _get_tags()
    return render_template('archive.html', title='归档', datas=datas, pagination=paginate, hot=hot_posts, tags=tags)


@app.route('/tag/<int:tid>')
def get_bytag(tid):
    page_num = request.args.get('page_num')
    if not page_num or int(page_num) < 1:
        page_num = 1
    paginate = Post.query.filter_by(status=1).filter_by(stype=1).filter(Post.id == PostTag.post_id).\
        filter(and_(PostTag.tag_id == tid,Post.category_id > 0)).order_by(Post.post_time.desc()).\
        paginate(int(page_num), gl.archive_page_limit, True)
    posts = paginate.items
    datas = []
    flag = ''
    for post in posts:
        post.post_time = time.strftime('%Y-%m-%d', time.localtime(post.post_time))
        year = post.post_time[0:4]
        if year != flag:
            flag = year
            datas.append({'post': post, 'year': year})
        else:
            datas.append({'post': post, 'year': ''})
    hot_posts = _get_hot()
    tags = _get_tags()
    return render_template('archive.html', title='标签', datas=datas, pagination=paginate, hot=hot_posts, tags=tags)


@app.route('/about')
def about():
    hot_posts = _get_hot()
    tags = _get_tags()
    post = Post.query.filter(Post.category_id == 0).first_or_404()
    post.content = unescape(post.content)
    return render_template('about.html', title='关于作者', hot=hot_posts, tags=tags, post=post)


@app.route('/ip')
def get_ip():
    return make_response(jsonify({'ip': request.headers['X-Real-Ip']}))


# 纪念日
@app.route('/pm/love/xq')
def love():
    return render_template('lover.html')


@app.errorhandler(404)
def not_found(e):
    return render_template('error.html', title='404', message='你要找的页面不存在...')


@app.errorhandler(500)
def server_error(e):
    return render_template('error.html', title='500', message='服务器内部发生错误...')


def _get_hot():
    return Post.query.filter_by(status=1).filter(Post.category_id > 0 ).order_by(Post.view_counts.desc(),
                                 Post.comment_counts.desc(), Post.post_time.desc()).limit(gl.hot_page_limit).offset(0)


def _get_tags():
    return Tag.query.all()

@app.route('/ip')
def get_ip():
    return make_response(jsonify({'ip': request.headers['X-Real-Ip']}))