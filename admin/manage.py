from flask_script import Manager
from admin.main import app, db
from admin.models import Post, Tag

manager = Manager(app)


@manager.command
def article_list():
    print(db.session.query(Post, Tag.name).outerjoin(Tag, Post.id == Tag.post_id))
    posts = db.session.query(Post, Tag.name).outerjoin(Tag, Post.id == Tag.post_id).all()
    flag = None
    vals = []
    for p in posts:
        print(p.Post)


@manager.command
def aritcle_query_byid(id):
    post = db.session.query(Post).filter_by(id=id).first()
    print(post.content)

if __name__ == '__main__':
    aritcle_query_byid(2)

