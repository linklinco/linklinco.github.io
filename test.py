import yaml
import os
# 打开并读取YAML文件
print(os.getcwd())
with open('config.yaml', 'r', encoding='utf8') as file:
    data = yaml.safe_load(file)

# 打印解析后的数据
print(data['md-path'])
