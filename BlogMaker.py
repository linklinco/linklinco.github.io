import os
import yaml
import time
import json
from datetime import datetime
from lib.Cryption import Cryption
import uuid
from tqdm import tqdm

class Article:
    def __init__(self,filename):
        # 根据文件名格式就是$name@topic%time#label  name、topic、time只能有一个 label无数个 如果以$开头表示加密        
        if filename[0] == '$':
            self.needPassword = True
            filename = filename[1:]
        else:
            self.needPassword = False
        # 从后往前分割
        # 1. 先分割#号，分割出标签
        if '#' in filename:
            filename, *self.label = filename.split('#')
        else:
            self.label = []
        # 2. 再分割%号，分割出时间
        if '%' in filename:
            filename, self.time = filename.split('%')
        else:
            self.time = None
        # 3. 最后分割@号，分割出标题和话题
        if '@' in filename:
            self.title,self.topic = filename.split('@')
        else:
            self.title = filename
            self.topic = None
        self.text = ''  # 文章内容
    
    def generate(self,filePath,password='12345678'):
        # 判断文件是否存在
        if os.path.exists(filePath):
            with open(filePath, 'r', encoding='utf8') as f:
                if self.needPassword:
                    # 需要加密
                    self.text = Cryption.encrypt(password, f.read())
                else:
                    # 直接读取文件内容
                    self.text = f.read()
                if self.time is None:
                    self.time = datetime.strftime(datetime.fromtimestamp(os.path.getmtime(filePath)), "%Y-%m-%d %H:%M:%S")
        else:
            raise FileNotFoundError(f"文件 {filePath} 不存在")
    
    def toJson(self):
        # 将文章信息转换为json格式
        data = {
            'title': self.title,
            'topic': self.topic,
            'time': self.time,
            'label': self.label,
            'needPassword': self.needPassword,
            'text': self.text
        }
        return json.dumps(data, ensure_ascii=False)
    

    def __str__(self):
        return f"标题：{self.title}\n话题：{self.topic}\n时间：{self.time}\n标签：{" ".join(self.label)}\n加密：{self.needPassword}\n内容：{self.text}"


class BlogMaker:

    def __init__(self, config=os.getcwd()) -> None:
        try:
            with open(os.path.join(config, "config.yaml"), "r", encoding='utf8') as f:
                data = yaml.safe_load(f)
                self.path = os.path.join(os.getcwd(),data['md-path'])
                self.output = os.path.join(os.getcwd(), data['output-path'])
                self.password = data['password']
        except:
            raise ValueError("配置文件无效,请核验")
    def genReadme(self):
        if not os.path.exists(self.output):
            os.mkdir(self.output)
        with open(os.path.join(self.output, 'about.json'), 'w+', encoding='utf8') as f:
            data = {}
            with open(os.path.join(self.path, 'README.MD'), 'r', encoding='utf8') as f1:
                data['markdown'] = f1.read()
                data = json.dumps(data, ensure_ascii=False)
                f.write(data)
    def __str__(self):
        return f"md文件夹路径：{self.path}\n输出文件夹路径：{self.output}\n密码：{self.password}"
    def genArticles(self):
        data = {}
        try:
            if not os.path.exists(self.path):
                raise FileNotFoundError(f"md文件夹{self.path}不存在，请检查配置文件")
            else:

                for root, dirs, files in tqdm(os.walk(self.path)):
                    for dir in dirs:
                        if not os.path.exists(os.path.join(self.output, dir)):
                            os.mkdir(os.path.join(self.output, dir))
                        if data.get(dir) is None:
                            data[dir] = []

                    for file in files:
                        fullFilePath = os.path.join(root, file)
                        filePath,fileName = os.path.split(fullFilePath)
                        _,fileClass= os.path.split(filePath)
                        name,fileType = os.path.splitext(fileName)
                        if fileType == '.md':
                            articleData = {}
                            article = Article(name)
                            article.generate(fullFilePath, self.password)
                            genName = ''.join(str(uuid.uuid4()).split('-'))+'.json'
                            with open(os.path.join(self.output,fileClass,genName), 'w+', encoding='utf8') as f:
                                f.write(article.toJson())
                            articleData['title'] = article.title
                            articleData['topic'] = article.topic
                            articleData['time'] = article.time
                            articleData['label'] = article.label
                            articleData['url'] = fileClass+"/"+genName
                            articleData['needPassword'] = article.needPassword
                            data[fileClass].append(articleData)
        except FileNotFoundError as e:
            raise e
        with open(os.path.join(self.output, 'data.json'), 'w+', encoding='utf8') as f:
            f.write(json.dumps(data, ensure_ascii=False))

if __name__ == "__main__":
    a = BlogMaker()
    print(a)
    print("开始生成博客")
    a.genReadme()
    a.genArticles()
    print("博客生成完毕")
    
