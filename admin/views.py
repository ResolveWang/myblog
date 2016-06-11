import time
import bleach
from flask import render_template, request
from markdown import markdown
from admin.models import Post, Tag
from admin.main import app, db


@app.route('/admin/login', methods=['GET', 'POST'])
def login():
    return render_template('login.html')


@app.route('/admin/')
def home():
    return render_template('index.html')


@app.route('/admin/article/add', methods=['GET', 'POST'])
def article_add():
    if request.method == 'POST':
        title = request.values.get('title')
        tags = request.values.get('tags').split(',')
        cont = request.values.get('cont')
        cont_html = bleach.linkify(bleach.clean(
           markdown(cont)
        ))
        post_time = int(time.time())
        post = Post(title=title, cont=cont_html, marksource=cont, post_time=post_time)
        db.session.add(post)
        # 下面这行代码用于获取自增长的主键
        db.session.flush()
        for tag in tags:
            t = Tag.query.filter_by(name=tag).first()
            if not t and tag.strip() != '':
                t = Tag(name=tag, post_id=post.id)
                db.session.add(t)
        db.session.commit()
    return render_template('/article/add.html')
