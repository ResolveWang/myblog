if [ -f /tmp/supervisor.sock ]; then
	sudo unlink /tmp/supervisor.sock;
fi

source /home/ubuntu/project/myblog/.env/bin/activate
supervisord -c /home/ubuntu/project/myblog/supervisord.conf
