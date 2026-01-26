## Git

/ 测试git commit与git push之后如何回退

> git reset HEAD xx.xx

/ 撤销修改的内容

> git checkout -- xx.xx

> 查看远程仓库
> `git remote`或`git remote -v`
> 添加远程仓库
> `git remote add [name] [url]`
> 从远程仓库抓取(只会下载到本地仓库，不会合并到本地仓库)
> `git fetch [name]`
> 推送
> `git push [name] [branch]`
> 修改远程仓库简写名称
> `git remote rename [old-name] [new-name]`
> 移除远程仓库
> `git remote remove [name]`

## Git 打标签

> 查看标签
> `git tag`
> 创建标签
> `git tag -a [tag-name] -m "[tag-message]"`
> 查看标签信息
> `git show [tag-name]`
> 给过去某个提交打标签
> `git tag -a [tag-name] [commit-id]`
> 删除标签
> `git tag -d [tag-name]`
> 删除远程标签
> `git push origin :refs/tags/[tag-name]`
> `git push origin --delete [tag-name]`

## Git 分支

> 查看分支
> `git branch`
> 创建分支
> `git branch [branch-name]`
> 切换分支
> `git checkout [branch-name]`
> 合并分支
> `git merge [branch-name]`
> 删除分支
> `git branch -d [branch-name]`
> 删除远程分支
> `git push origin --delete [branch-name]`
> 删除未合并的分支
> `git branch -D [branch-name]`

## Git 远程

> 查看远程仓库
> `git remote`或`git remote -v`
> 添加远程仓库
> `git remote add [name] [url]`
> 从远程仓库抓取(只会下载到本地仓库，不会合并到本地仓库)
> `git fetch [name]`
> 推送
> `git push [name] [branch]`
> 修改远程仓库简写名称
> `git remote rename [old-name] [new-name]`
> 移除远程仓库
> `git remote remove [name]`

## vim

> 保存并退出
> `:wq`
> 退出
> `:q`
