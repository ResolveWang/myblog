from flask_sqlalchemy import SQLAlchemy, SignallingSession


class MySQLAlchemy(SQLAlchemy):
    def create_session(self, options):
        options['autoflush'] = False
        return SignallingSession(self, **options)