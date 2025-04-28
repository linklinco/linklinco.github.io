from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import padding
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.backends import default_backend
import os
import hashlib
import base64
import re


def generate_key_from_password(password: str, salt: bytes = b'uniqueUserSalt123', iterations: int = 100000):
    """
    从密码生成 AES-256 密钥
    :param password: 用户密码
    :param salt: 盐值(可选，若不提供则随机生成)
    :param iterations: PBKDF2迭代次数(默认10万次)
    :return: (key)
    """
    # 生成随机盐(如果未提供)
    if salt is None:
        salt = os.urandom(16)

    # 使用PBKDF2从密码派生密钥
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,  # AES-256需要32字节(256位)
        salt=salt,
        iterations=iterations,
        backend=default_backend()
    )

    key = kdf.derive(password.encode('utf-8'))
    return key


def get_deterministic_iv(password: str) -> bytes:
    """加入唯一标识使IV更安全"""
    combined = password  # unique_id可以是文件名、用户ID等
    return hashlib.sha256(combined.encode()).digest()[:12]


def aes_gcm_encrypt(plaintext, key):
    """
    AES-GCM 加密
    :param plaintext: 要加密的明文(bytes)
    :param key: 加密密钥(16, 24或32字节对应AES-128/192/256)
    :return: (iv, ciphertext, tag) 元组
    """
    iv = get_deterministic_iv(key)
    key = generate_key_from_password(key)
    plaintext = plaintext.encode('utf-8')
    # 生成随机初始化向量(IV)，GCM推荐12字节
    # 创建加密器
    encryptor = Cipher(
        algorithms.AES(key),
        modes.GCM(iv),
        backend=default_backend()
    ).encryptor()
    # 加密数据
    ciphertext = encryptor.update(plaintext) + encryptor.finalize()

    # print("加密密文："+base64.b64encode(ciphertext).decode('utf-8'))
    # print("加密tag；"+base64.b64encode(encryptor.tag).decode('utf-8'))
    print(len(encryptor.tag))

    data = ciphertext+encryptor.tag
    return base64.b64encode(data).decode('utf-8')


def aes_gcm_decrypt(ciphertext, key):
    """
    AES-GCM 解密
    :param iv: 初始化向量
    :param ciphertext: 密文
    :param tag: 认证标签
    :param key: 解密密钥
    :return: 解密后的明文
    """
    # print("解密密文："+ciphertext)
    ciphertext = base64.b64decode(ciphertext)
    tag = ciphertext[-16:]
    ciphertext = ciphertext[:-16]
    iv = get_deterministic_iv(key)
    key = generate_key_from_password(key)
    # 创建解密器
    decryptor = Cipher(
        algorithms.AES(key),
        modes.GCM(iv, tag),
        backend=default_backend()
    ).decryptor()
    # 解密数据
    text = decryptor.update(ciphertext) + decryptor.finalize()
    text = text.decode('utf-8')
    return text


class Cryption:
    @staticmethod
    def encrypt(password, text):
        return aes_gcm_encrypt(text, password)

    def decrypt(password, text):
        return aes_gcm_decrypt(text, password)


# 示例使用
if __name__ == "__main__":
    # 生成随机密钥(AES-256需要32字节)
    key = "123456"

    # 要加密的数据
    plaintext = "这是要加密的数据"

    # 加密
    ciphertext = aes_gcm_encrypt(plaintext, key)

    # 解密
    decrypted = aes_gcm_decrypt(ciphertext, key)
