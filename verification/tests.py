"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""

TESTS = {
    "Basics": [
        {
            "input": [
                [
                    "X...",
                    "..X.",
                    "X..X",
                    "...."
                ],
                [
                    "itdf",
                    "gdce",
                    "aton",
                    "qrdi"
                ]
            ],
            "answer": "icantforgetiddqd"
        },
        {
            "input": [
                [
                    "....",
                    "X..X",
                    ".X..",
                    "...X"
                ],
                [
                    "xhwc",
                    "rsqx",
                    "xqzz",
                    "fyzr"
                ]
            ],
            "answer": "rxqrwsfzxqxzhczy"
        },

    ],
    "Edge": [
        {
            "input": [
                [
                    "X...",
                    ".X..",
                    "..X.",
                    "...X",
                ],
                [
                    "aaaa",
                    "aaaa",
                    "aaaa",
                    "aaaa"
                ]
            ],
            "answer": "aaaaaaaaaaaaaaaa"
        },
        {
            "input": [
                [
                    "X..X",
                    "....",
                    "....",
                    "X..X",
                ],
                [
                    "abcd",
                    "efgh",
                    "ijkl",
                    "mnop"
                ]
            ],
            "answer": "admpadmpadmpadmp"
        },
        {
            "input": [
                [
                    "....",
                    ".XX.",
                    ".XX.",
                    "....",
                ],
                [
                    "abcd",
                    "efgh",
                    "ijkl",
                    "mnop"
                ]
            ],
            "answer": "fgjkfgjkfgjkfgjk"
        },
    ],
    "Extra": [
        {
            "input": [
                [
                    "X...",
                    ".X..",
                    "..X.",
                    "...X"
                ],
                [
                    "azbx",
                    "azbx",
                    "azbx",
                    "azbx"
                ]
            ],
            "answer": "azbxxbzaazbxxbza"
        },
        {
            "input": [
                [
                    "XXXX",
                    "....",
                    "....",
                    "....",
                ],
                [
                    "call",
                    "rsqi",
                    "epzn",
                    "yeee"
                ]
            ],
            "answer": "calllineyeeecrey"
        },
        {
            "input": [
                [
                    "X...",
                    "X...",
                    "X...",
                    "X...",
                ],
                [
                    "call",
                    "rsqi",
                    "epzn",
                    "yeee"
                ]
            ],
            "answer": "creycalllineyeee"
        },
        {
            "input": [
                [
                    "X...",
                    "..X.",
                    ".X..",
                    "...X",
                ],
                [
                    "name",
                    "goto",
                    "line",
                    "nope"
                ]
            ],
            "answer": "ntieeonnntieeonn"
        },
        {
            "input": [
                [
                    "XX..",
                    "....",
                    "....",
                    "..XX",
                ],
                [
                    "cree",
                    "band",
                    "test",
                    "yepp"
                ]
            ],
            "answer": "crppedtycrppedty"
        },
        {
            "input": [
                [
                    "....",
                    "X..X",
                    "X..X",
                    "....",
                ],
                [
                    "cree",
                    "band",
                    "test",
                    "yepp"
                ]
            ],
            "answer": "bdttreepbdttreep"
        },

        {
            "input": [
                [
                    "...X",
                    "..X.",
                    "..X.",
                    "...X",
                ],
                [
                    "aazz",
                    "aazz",
                    "aazz",
                    "aazz"
                ]
            ],
            "answer": "zzzzazazaaaaazaz"
        },



    ]
}
