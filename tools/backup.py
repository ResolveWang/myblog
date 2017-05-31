import os
from tools.get_conf import get_db
import time


def blog_backup():
    db_args = get_db()
    name = db_args.get('dbuser')
    password = db_args.get('dbpassword')
    dbname = db_args.get('dbname')
    host = db_args.get('host')
    file_name = time.strftime('%Y-%m-%d', time.localtime())
    sql = 'mysqldump -u {name} -p{password} -h {address} {dbname} > ~/backup/{file}.sql'.format \
        (name=name, password=password, address=host, dbname=dbname, file=file_name)
    os.system(sql)


if __name__ == '__main__':
    blog_backup()