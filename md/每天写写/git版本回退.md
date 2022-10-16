### git版本回退 

与`git add`相对应 `git checkout -- filename.txt`用于撤销修改 ，注意是有两个`--`

`git add`提交之后，使用`git reset HEAD <filename>`回退单个文件



`git commit`提交完之后，可以通过`git log`查看提交情况



```
commit d9c3bc480f5eec70468dcd4cb617fddef95ace00
Author: linco <linklinco@163.com>
Date:   Tue Oct 11 20:58:10 2022 +0800

    v0.2

commit 48b1dc5bc4d0de86ae9813734d5a172e269f6049
Author: linco <linklinco@163.com>
Date:   Tue Oct 11 20:56:24 2022 +0800

    建立文件

```

使用 `git reset --hard HEAD^`可以将工作区返回为之前的部分

用`git log --graph`命令可以看到分支合并图

* `git reflog`记录了每一次的命令，可以用`git reflog`来查看之前的命令



`git`打标签

```
git tag v0.1
```

##### 删除文件

`git rm 1.txt`删除文件 和直接删除 然后使用`git add filename.txt`一样

### 分支管理

##### 创建分支

`git checkout -b dev` 创建并切换分支，加了`-b`

单纯创建分支使用`git branch dev` ，然后再使用`git checkout dev`来切换分支

也可以用`git switch dev`来切换分支，避免和之前的弄混，加上`git switch -c dev`进行创建并切换分支。

##### 删除分支

`git branch -d dev`删除`dev`分支

##### 查询所有分支

使用`git branch`会列出所有分支和当前所在的分支



##### 分支合并（重要）

首先切换到准备主分支，然后使用`git merge dev`来进行分支合并

如果合并出现冲突就要手动解决掉冲突的文件之后再进行git add 和git commit

##### 临时保存

切换分支之前，使用`git stash`可以将目前正在进行的工作状态暂时存储起来

使用`git stash list`查看保存的工作区内容

使用`git stash apply`来进行恢复，这种恢复不会删除stash内容，需要使用`git stash drop`来进行恢复 

还有一种是使用`git stash pop`来进行恢复并且删除

```
//多次保存可以用下面命令恢复
git stash apply stash@{0}
```

##### 合并历史错误

`git cherry-pick 4c805e2`合并一个特定的提交到当前分支

合并特定分支

```
$ git cherry-pick cddffc
[dev a9a1d65] fix
 Date: Tue Oct 11 21:58:13 2022 +0800
 1 file changed, 2 insertions(+)
```

##### 丢弃未合并分支

如果要丢弃一个没有被合并过的分支，可以通过`git branch -D <name>`强行删除。

### 标签管理

```
$ git tag -a v0.1 -m "version 0.1 released" 1094adb
```

`git tag`可以看到所有的分支

##### 删除标签

`git tag -d v0.1`

##### 推送标签到远程

`git push origin <tagname>`

或者一次性推送所有标签`git push origin --tags`