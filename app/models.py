from app.main import db


class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    content = db.Column(db.Text)
    markdown_source = db.Column(db.Text)
    category_id = db.Column(db.Integer)
    tags = db.Column(db.String)
    post_time = db.Column(db.Integer)
    comment_counts = db.Column(db.Integer, default=0)
    view_counts = db.Column(db.Integer, default=0)
    like_counts = db.Column(db.Integer, default=0)
    status = db.Column(db.Integer, default=1)
    stype = db.Column(db.Integer, default=1)

    def __init__(self, title, cont, marksource, category, tags_str, post_time, stype):
        self.title = title
        self.content = cont
        self.markdown_source = marksource
        self.category_id = category
        self.tags = tags_str
        self.post_time = post_time
        self.stype = stype

    def __str__(self):
        return 'title:'+self.title+',content:'+self.content+',post_time:'+str(self.post_time)


class Tag(db.Model):
    __tablename__ = 'tags'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    size = db.Column(db.Integer)
    RGB = db.Column(db.String)

    def __init__(self, name, size, RGB):
        self.name = name
        self.size = size
        self.RGB = RGB

    def __repr__(self):
        return 'name:'+self.name


class PostTag(db.Model):
    __tablename__ = 'post_tag'
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer)
    tag_id = db.Column(db.Integer)

    def __init__(self, post_id, tag_id):
        self.post_id = post_id
        self.tag_id = tag_id



