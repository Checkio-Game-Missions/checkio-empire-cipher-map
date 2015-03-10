**Optional goals**

**Rank 2**: A grille can be bigger size than 4 by 4. 
And the password can be more than 16 characters.

_Precondition Rank 2_:

```python
len(cipher_grille) => 4
len(ciphered_password) => 4
all(len(row) => 4 for row in ciphered_password)
all(len(row) => 4 for row in cipher_grille)
```

**Rank 3**: If first letter (first row, first column) is a capital letter, 
then turns the grille 90 degrees **counterclockwise**.

```python
all(all(ch in string.ascii_letters for ch in row) for row in ciphered_password)
```
