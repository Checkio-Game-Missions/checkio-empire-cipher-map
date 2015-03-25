from checkio_referee import RefereeBase, representations

import settings
import settings_env
from tests import TESTS

cover = """
def cover(f, data):
    f(*[tuple(str(row) for row in matrix) for matrix in data])
"""


def py_repr(data, f):
    return "{}({}, {})".format(
        f,
        tuple(data["input"][0]),
        tuple(data["input"][1]),
    )


class Referee(RefereeBase):
    TESTS = TESTS
    ENVIRONMENTS = settings_env.ENVIRONMENTS

    DEFAULT_FUNCTION_NAME = "recall_password"
    ENV_COVERCODE = {
        "python_2": cover,
        "python_3": cover,
        "javascript": None
    }
    CALLED_REPRESENTATIONS = {
        "python_2": py_repr,
        "python_3": py_repr,
        "javascript": representations.unwrap_arg_representation
    }
