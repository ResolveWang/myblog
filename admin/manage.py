from flask_script import Manager
from admin.main import app, db
from admin.models import Post, Tag
from sqlalchemy import or_

manager = Manager(app)


@manager.command
def article_list():
    print(db.session.query(Post, Tag.name).outerjoin(Tag, Post.id == Tag.post_id))
    posts = db.session.query(Post, Tag.name).outerjoin(Tag, Post.id == Tag.post_id).all()
    for p in posts:
        print(p.Post)


@manager.command
def aritcle_query_byid(id):
    post = db.session.query(Post).filter_by(id=id).first()
    print(post.content)


@manager.command
def article_search(keyword):
    posts = db.session.query(Post).filter(or_(Post.title.like('%'+keyword+'%'), Post.content.like('%'+keyword+'%'))).all()
    print(str(db.session.query(Post).filter(or_(Post.title.like('%'+keyword+'%'), Post.content.like('%'+keyword+'%')))))
    print(posts)

if __name__ == '__main__':
    article_search('测试')

