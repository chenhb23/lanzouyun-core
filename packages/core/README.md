# `core`

> TODO: description

## Usage

```
const core = require('core');

// TODO: DEMONSTRATE API
```

- 设置过期 url，防止重复请求，也是为了提高效率

```
返回本地 path:
- 如果没有缓存 path，①请求 url，缓存 path，返回 path
- 如果存在 path，判断 path 所指向的文件是否存在
  - 如果文件存在，返回 path
  - 如果文件不存在，执行①
  
{
  path: '',
  name: '',
}
```
