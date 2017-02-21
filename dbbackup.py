from tools.backup import blog_backup

# 备份程序只有在命令行中运行，并且需要添加mysqldump到环境变量
if __name__ == '__main__':
    blog_backup()
