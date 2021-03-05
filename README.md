## api 说明

### upload

最简单用法

```ts
upload({path: 'DF1E5B4D-459A-4295-B441-61A93D0CCCA7.png'})
```

### download

```ts
download({
  url: 'https://wws.lanzous.com/xxxxxxxxx',
  path: 'xxxxxxxxx.png',
  onProgress: (resolve, total) => {
    console.log(resolve, total)
  },
})
```

### lsShareUrl

```ts
lsShareUrl({url: 'https://wws.lanzous.com/xxxxxxxxx'})
```

### mkdir

```ts
const folderId = await mkdir({parentId, folderName})
```

### 未完待续...
