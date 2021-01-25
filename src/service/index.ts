import Dispatch from '@/libs/dispatch'

// 用户模块
export const userDispatch = new Dispatch({
  invite: ['/ctag/user/invite', 'post'],
  modify: ['/ctag/user/modify', 'post'],
  modifyPassword: ['/ctag/user/modifyPassword', 'post'],
  page: ['/ctag/user/select/page', 'post'],
  uploadAvatar: ['/ctag/user/uploadAvatar', 'post'],
})

// 编码规则
export const codeRuleDispatch = new Dispatch({
  page: ['/ctag/tag/package/rule/select/page', 'post'],
  create: ['/ctag/tag/package/rule/create', 'post'],
  update: ['/ctag/tag/package/rule/update', 'post'],
  select: ['/ctag/tag/package/rule/select/all', 'post'],
})

// 用户模块
export const UserPageDispatch = new Dispatch({
  page: ['/ctag/user/select/page', 'post'],
  modify: ['/ctag/user/modify', 'post'],
})

// 角色信息
export const roleInfoDispatch = new Dispatch({
  list: ['/ctag/role/list', 'post'],
})

// 原厂标签
export const originTagDispatch = new Dispatch({
  page: ['/ctag/origin/tag/select/page', 'post'],
  create: ['/ctag/origin/tag/create', 'post'],
  update: ['/ctag/origin/tag/update', 'post'],
})

// 标签模版和装箱规则
export const tagPackageDispatch = new Dispatch({
  tagPage: ['/ctag/tag/select/page', 'post'],
  tagAll: ['/ctag/tag/select/all', 'post'],
  createTag: ['/ctag/tag/create', 'post'],
  update: ['/ctag/tag/update', 'post'],
  packageRulePage: ['/ctag/tag/select/sub/page', 'post'],
  packageRuleAll: ['/ctag/tag/select/sub/all', 'post'],
  createPackageRule: ['/ctag/tag/create/sub', 'post'],
})

// 标签数据项
export const tagDataItemDispatch = new Dispatch({
  page: ['/ctag/tag/item/select/page', 'post'],
  create: ['/ctag/tag/item/create', 'post'],
  update: ['/ctag/tag/item/update', 'post'],
  select: ['/ctag/tag/item/select/all/tag/id', 'post'],
})

// 标签实例
export const labelDispatch = new Dispatch({
  createTable: ['/ctag/label/table/create', 'post'],
  create: ['/ctag/label/generate', 'post'],
  paginate: ['/ctag/label/paginate', 'post'],
})

// 标签打印模板
export const layoutDispatch = new Dispatch({
  create: ['/ctag/layout/create', 'post'],
  paginate: ['/ctag/layout/paginate', 'post'],
  list: ['/ctag/layout/list', 'post'],
})
