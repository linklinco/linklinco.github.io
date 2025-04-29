import os
import time

# 文件路径
file_path = "run.sh"

# 获取最后修改时间（时间戳）
modification_time = os.path.getmtime(file_path)

# 转换为可读格式
readable_time = time.ctime(modification_time)
print(f"文件最后修改时间: {readable_time}")

# 或者使用 datetime 模块
from datetime import datetime
readable_time = datetime.fromtimestamp(modification_time)
print(f"文件最后修改时间: {readable_time}")
