import os
import yaml


class BlogMaker:
    def __init__(self, config=os.getcwd()) -> None:
        try:
            with open(os.path.join(config, "config.yaml"), "r", encoding='utf8') as f:
                data = yaml.safe_load(f)
                self.path = os.path.join(os.getcwd(),data['md-path'])
                self.password = data['password']
        except:
            raise ValueError("配置文件无效,请核验")

    def genArticles(self):
        for root, dirs, files in os.walk(self.path):
            print(root)
            print(dirs)
            print(files)
            # for file in files:
            #     print(file)


if __name__ == "__main__":
    a = BlogMaker()
    print(a.password)
    print(a.path)
    a.genArticles()
