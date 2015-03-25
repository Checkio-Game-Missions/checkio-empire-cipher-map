from checkio.signals import ON_CONNECT
from checkio import api
from checkio.referees.io import CheckiOReferee
from tests import TESTS

cover = """def cover(func, in_data):
    return func(tuple(in_data[0]), tuple(in_data[1]))
"""

api.add_listener(
    ON_CONNECT,
    CheckiOReferee(
        tests=TESTS,
        cover_code={
            'python-27': cover,
            'python-3': cover
        },
        DEFAULT_FUNCTION_NAME="recall_password").on_ready)
