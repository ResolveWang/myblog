import logging
from logging import config as log_conf

log_config = {
    'version': 1.0,
    'formatters': {
        'detail': {
            'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            'datefmt': "%Y-%m-%d %H:%M:%S"
        },
        'simple': {
            'format': '%(name)s - %(levelname)s - %(message)s',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'level': 'INFO',
            'formatter': 'simple'
        },
        'file': {
            'class': 'logging.handlers.WatchedFileHandler',
            'filename': 'log.txt',
            'level': 'INFO',
            'formatter': 'detail',
            'encoding': 'utf-8',
        },
    },
    'loggers': {
        'web_log': {
            'handlers': ['console', 'file'],
            'level': 'DEBUG',
        },
    }
}

log_conf.dictConfig(log_config)

web_logger = logging.getLogger('web_log')

__all__ = ['web_logger']
