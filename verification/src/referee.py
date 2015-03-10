from checkio_referee import RefereeBase

import settings
import settings_env
from tests import TESTS

cover = """
def cover(f, data):
    f(*[tuple(str(row) for row in matrix) for matrix in data])
"""


class Referee(RefereeBase):
    TESTS = TESTS
    EXECUTABLE_PATH = settings.EXECUTABLE_PATH
    CURRENT_ENV = settings_env.CURRENT_ENV
    FUNCTION_NAME = "recall_password"
    ENV_COVERCODE = {
        "python_2": cover,
        "python_3": cover,
        "javascript": None
    }
