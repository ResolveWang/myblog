# what kind of people are this blog system suitable for
- The one who wants to learn web development
- The one who wants to learn flask
- The one who just wants to write a blog with markdown

# why am I doing this work
- Wordpress is too large,slow and I'm not used to static blog like hexo.
- I have learned flask rencently,so I want to write a blog with it to aquire it.
- I have time and just want to write it for fun!

# what knowledge are used in this blog
- Flask and it plug-ins
- Bootstrap
- MYSQL Database


# how to use it
- use the file `nginx.conf` to make your own nginx configuration
- use `gunicorn -c home.conf -k gevent home:app` to start home app
- user `gunicorn -c myadmin.conf -w 1 myadmin:app` to start admin app
- or just use supervisor to to all these jobs

# others...
- welcome to fork and star if you like it or it's useful to you
- welcome to full a request
- it will be updated for long

***

# 这个博客系统适合谁
- 想学习web开发的新手
- 想学习flask的pythoner
- 仅仅想使用markdown写博客而又比较喜欢该博客风格的朋友

# 为什么我要实现一个博客系统
- 以前用的worldpress，但是它太大太慢了，而且对markdown支持不好，我也不习惯用hexo等静态博客
- 最近学习了flask，想用它练练手
- 最近时间比较空闲，纯粹是为了乐趣

# 这个博客系统用到了什么知识
- flask框架和它的一些插件
- bootstrap用于前台页面显示，后台页面是找的模板
- mysql数据库和sqlalchemy

# 如何使用
- 使用根目录提供的nginx模版配自己的nginx server
- 使用`gunicorn -c home.conf -k gevent home:app`来启动*home*应用
- 使用`gunicorn -c myadmin.conf -w 1 myadmin:app`来启动*admin*应用
- 或者直接使用supervisor来启动所有应用

# 其他
- 如果你觉得它还行或者对你有用，欢迎fork和star
- 欢迎pull requests
- 我打算长期改进它

# Todo
- 修复当修改文章类型不起作用的bug
- 考虑使用win32 API截图和上传七牛图床
- 增强应用的扩展性，让分类等不使用硬编码