
// 角色信息
export interface RoleInfo {
  count: number;
  name: string;
  parentRoleId: number;
  pid: number;
}

// 角色列表
export type RoleList = RoleList[]