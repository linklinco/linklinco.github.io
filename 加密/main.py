from Cryption import Cryption

text = "21231"
with open("1.text", "r", encoding='utf8') as f:
    text = f.read()
print(text)
password = "dfeqfdch"

print(Cryption.encrypt(password, text))

data = Cryption.encrypt(password, text)
print(data)

with open("a.txt", "w+", encoding="utf8") as f:
    f.write(data)

print(Cryption.decrypt(password, data))
