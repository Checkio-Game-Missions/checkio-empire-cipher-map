from checkio_referee import RefereeRank, representations, covercodes, ENV_NAME


import settings_env
from tests import TESTS

cover = """
def cover(f, data):
    return f(*[tuple(str(row) for row in matrix) for matrix in data])
"""


def py_repr(data, f):
    return "{}({}, {})".format(
        f,
        tuple(data["input"][0]),
        tuple(data["input"][1]),
    )


class Referee(RefereeRank):
    TESTS = TESTS
    ENVIRONMENTS = settings_env.ENVIRONMENTS

    DEFAULT_FUNCTION_NAME = "recall_password"
    FUNCTION_NAMES = {
        ENV_NAME.JS_NODE: "recallPassword"
    }
    ENV_COVERCODE = {
        ENV_NAME.PYTHON: cover,
        ENV_NAME.JS_NODE: covercodes.js_unwrap_args
    }
    CALLED_REPRESENTATIONS = {
        ENV_NAME.PYTHON: py_repr,
        ENV_NAME.JS_NODE: representations.unwrap_arg_representation
    }
