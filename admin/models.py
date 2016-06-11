from admin.main import db


class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    content = db.Column(db.Text)
    markdown_source = db.Column(db.Text)
    post_time = db.Column(db.Integer)
    comment_counts = db.Column(db.Integer, default=0)
    view_counts = db.Column(db.Integer, default=0)
    like_counts = db.Column(db.Integer, default=0)
    status = db.Column(db.Integer, default=1)

    def __init__(self, title, cont, marksource, post_time):
        self.title = title
        self.content = cont
        self.markdown_source = marksource
        self.post_time = post_time


class Tag(db.Model):
    __tablename__ = 'tags'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    post_id = db.Column(db.Integer)

    def __init__(self, name, post_id):
        self.name = name
        self.post_id = post_id