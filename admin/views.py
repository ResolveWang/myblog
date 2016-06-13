import time
import bleach
from flask import render_template, request, redirect, url_for
from markdown import markdown
from admin.models import Post, Tag, PostTag
from admin.main import app, db


@app.route('/admin/login', methods=['GET', 'POST'])
def login():
    return render_template('login.html')


@app.route('/admin/')
def home():
    return render_template('index.html')


@app.route('/admin/article/index')
def article_list():
    posts = db.session.query(Post).all()
    for p in posts:
        p.post_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(p.post_time))
    return render_template('/article/index.html', posts=posts)


@app.route('/admin/article/add', methods=['GET', 'POST'])
def article_add():
    if request.method == 'POST':
        title = request.values.get('title')
        tags_str = request.values.get('tags')
        tags = tags_str.split(',')
        category = int(request.values.get('category'))
        cont = request.values.get('cont')
        cont_html = bleach.linkify(bleach.clean(
           markdown(cont)
        ))
        post_time = int(time.time())
        post = Post(title=title, cont=cont_html, marksource=cont, post_time=post_time, category=category, tags_str=tags_str)
        db.session.add(post)
        # 下面这行代码用于获取自增长的主键
        db.session.flush()
        for tag in tags:
            t = Tag.query.filter_by(name=tag).first()
            if not t and tag.strip() != '':
                t = Tag(name=tag)
                db.session.add(t)
                db.session.flush()
            db.session.add(PostTag(post.id, t.id))
        db.session.commit()
    return render_template('/article/add.html', post=None)


@app.route('/admin/article/edit/<string:pid>', methods=['GET', 'POST'])
def article_edit(pid):
    post = db.session.query(Post).filter_by(id=int(pid)).first()
    if request.method == 'POST':
        post.title = request.values.get('title')
        post.tags = request.values.get('tags')
        tag_list = post.tags.split(',')
        post.cacategory_id = int(request.values.get('category'))
        post.markdown_source = request.values.get('cont')
        post.content = bleach.linkify(bleach.clean(
            markdown(post.markdown_source)
        ))

        for tag in tag_list:
            t = Tag.query.filter_by(name=tag).first()
            if not t and tag.strip() != '':
                t = Tag(name=tag)
                db.session.add(t)
                db.session.flush()
                db.session.add(PostTag(post.id, t.id))
            else:
                r = PostTag.query.filter_by(post_id=post.id).filter_by(tag_id=t.id).first()
                if not r:
                    db.session.add(PostTag(post.id, t.id))
        db.session.commit()
    return render_template('/article/add.html', post=post)


@app.route('/admin/article/delete/<string:pid>')
def article_delete(pid):
    post = db.session.query(Post).filter_by(id=int(pid)).first()
    db.session.delete(post)
    db.session.commit()
    return redirect(url_for('article_list'))


@app.route('/admin/article/show/<string:pid>')
def article_showorhide(pid):
    post = db.session.query(Post).filter_by(id=int(pid)).first()
    post.status = 0 if post.status == 1 else 1
    db.session.commit()
    return redirect(url_for('article_list'))