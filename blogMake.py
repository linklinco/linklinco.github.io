import os
from platform import architecture
import shutil
import json
from time import time
import uuid
from pprint import pprint as print

# a = uuid.uuid4()
# a = ''.join(str(a).split('-'))
# print(a)


def aboutme():
    about_me_path_name = os.path.join(os.getcwd(), 'aboutme.md')
    data = {}
    with open(about_me_path_name, 'r', encoding='utf8') as f:
        data['markdown'] = f.read()
        data = json.dumps(data, ensure_ascii=False)
        with open('data\\aboutme.json', 'w+', encoding='utf8') as f1:
            f1.write(data)


def init():
    if os.path.exists('data'):
        shutil.rmtree('data')
    os.mkdir('data')


init()
# 文件名格式就是$name@topic%time#label  name、topic、time只能有一个 label无数个 如果以$开头表示加密

md = os.path.join(os.getcwd(), 'md')
data = []
articles = {}

for i, j, k in os.walk(md):
    for m in j:
        os.mkdir(os.path.join('data', m))
    for article in k:
        cls, doc = os.path.split(os.path.join(i, article))
        _, cls = os.path.split(cls)
        if cls in articles:
            articles[cls].append(doc)
        else:
            articles[cls] = []
            articles[cls].append(doc)
res = {}
for key in articles:
    res[key] = []
    for article in articles[key]:
        tmp = {}
        art = article[0:-3]
        try:
            tmp['title'], other = art.split("@")
            tmp['topic'], other = other.split("%")
            tmp['time'], *label = other.split("#")
            tmp['label'] = label
        except:
            tmp['title'] = art
            tmp['topic'] = ''
            tmp['label'] = []
        tmp['time'] = int(os.path.getmtime(os.path.join(
            os.getcwd()+'\\md\\'+'\\'+key+'\\'+article)))
        tmp_name = ''.join(str(uuid.uuid4()).split('-'))+'.json'
        tmp_names = os.path.join(key, tmp_name)
        tmp_names = os.path.join('data', tmp_names)

        with open(os.path.join(os.getcwd()+'\\md\\'+'\\'+key+'\\'+article), 'r', encoding='utf8') as f:
            tmp['markdown'] = f.read()
            with open(os.path.join(os.getcwd(), tmp_names), 'w+', encoding='utf8') as f1:
                f1.write(json.dumps(tmp, ensure_ascii=False))
        tmp['markdown'] = tmp['markdown'][0:100].replace('\n', '')
        tmp['url'] = key+'/'+tmp_name
        res[key].append(tmp)

data = json.dumps(res, ensure_ascii=False)
with open('data\\data.json', 'w+', encoding='utf8') as f:
    f.write(data)
aboutme()
