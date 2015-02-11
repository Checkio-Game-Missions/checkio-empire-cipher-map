We need more complex passwords for our Vault.
Maybe we can use grille password system.
Thus, the encoder can be confident that no hooligan will easily gain access to the locked door.

A cipher grille is a 4×4 square of paper with four windows cut out.
Placing the grille on a paper sheet of the same size,
the encoder writes down the first four symbols of his password inside the windows (see fig. below).
After that, the encoder turns the grille 90 degrees clockwise.
The symbols written earlier become hidden under the grille and clean paper appears inside the windows.
The encoder then writes down the next four symbols of the password in the windows and turns the grille 90 degrees again.
Then, they write down the following four symbols and turns the grille once more.
Lastly, they write down the final four symbols of the password.
Without the same cipher grille, it is difficult to discern the password from the resulting square comprised of 16 symbols.

Write a module that enables the robots to easily recall their passwords through codes.

![Cipher_map](cipher_map.svg)

**Input:** A cipher grille and a ciphered password as a tuples of strings.

**Output:** The password as a string. 

**Example:**

```python
recall_password(
    ('X...',
     '..X.',
     'X..X',
     '....'),
    ('itdf',
     'gdce',
     'aton',
     'qrdi')) == 'icantforgetiddqd'
recall_password(
    ('....',
     'X..X',
     '.X..',
     '...X'),
    ('xhwc',
     'rsqx',
     'xqzz',
     'fyzr')) == 'rxqrwsfzxqxzhczy'
```

**How it is used:**

Here you can learn how to work with 2D arrays.
You also get to learn about the ancient Grille Cipher,
a technique of encoding messages which has been used for half a millenium.
The earliest known description of the grille cipher comes from the Italian mathematician, Girolamo Cardano in 1550.

**Precondition:**

```python
len(cipher_grille) == 4
len(ciphered_password) == 4
all(len(row) == 4 for row in ciphered_password)
all(len(row) == 4 for row in cipher_grille)
all(all(ch in string.ascii_lowercase for ch in row) for row in ciphered_password)
all(all(ch == "X" or ch == "." for ch in row) for row in cipher_grille)
```
