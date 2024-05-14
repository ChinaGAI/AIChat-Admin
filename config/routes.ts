/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/dashboard',
    name: '监控面板',
    icon: 'smile',
    component: './Dashboard',
  },
  {
    path: '/user',
    name: '用户管理',
    icon: 'usergroupAdd',
    access: 'USER',
    routes: [
      {
        path: '',
        redirect: '/user/list',
      },
      {
        name: '用户列表',
        path: 'list',
        component: './User/List',
        access: 'USER_VIEW',
      },
      {
        name: '登录记录',
        path: 'history/login',
        component: './User/History/Login',
        access: 'USER_HISTORY_LOGIN',
      },
      {
        name: '短信记录',
        path: 'history/sms',
        component: './User/History/Sms',
        access: 'USER_HISTORY_SMS',
      },
      {
        name: '邮件记录',
        path: 'history/email',
        component: './User/History/Email',
        access: 'USER_HISTORY_SMS',
      },
      {
        name: '用户记录',
        path: ':id',
        hideInMenu: true,
        routes: [
          {
            name: '登录记录',
            path: 'history/login',
            component: './User/History/Login',
            access: 'USER_HISTORY_LOGIN',
          },
          {
            name: '短信记录',
            path: 'history/sms',
            component: './User/History/Sms',
            access: 'USER_HISTORY_SMS',
          },
          {
            name: '邮件记录',
            path: 'history/email',
            component: './User/History/Email',
            access: 'USER_HISTORY_SMS',
          },
        ],
      },
    ],
  },
  {
    path: '/chat',
    name: '对话管理',
    icon: 'CommentOutlined',
    access: 'CHAT',
    routes: [
      {
        name: '助手管理',
        path: 'assistants',
        component: './Chat/Assistants',
        access: 'CHAT_ASSISTANT_VIEW',
      },
      {
        name: '套餐管理',
        path: 'plans',
        component: './Chat/Plans',
        access: 'CHAT_PLAN_VIEW',
      },
      {
        name: '订单列表',
        path: 'orders',
        component: './Chat/Orders',
        access: 'CHAT_ORDER_VIEW',
      },
      {
        name: '平台配置',
        path: 'platforms',
        component: './Chat/Platforms',
        access: 'CHAT_MODEL_VIEW',
      },
    ],
  },
  {
    path: '/system',
    name: '系统管理',
    icon: 'setting',
    access: 'SYSTEM',
    routes: [
      {
        name: '员工管理',
        path: 'employee',
        component: './System/Employee/List',
        access: 'SYSTEM_EMPLOYEE_VIEW',
      },
      {
        name: '部门管理',
        path: 'department',
        component: './System/Department/List',
        access: 'SYSTEM_DEPARTMENT_VIEW',
      },
      {
        name: '角色管理',
        path: 'role',
        component: './System/Role/List',
        access: 'SYSTEM_ROLE_VIEW',
      },
      {
        name: '权限管理',
        path: 'access',
        component: './System/Access/List',
        access: 'SYSTEM_ACCESS_VIEW',
      },
      {
        name: '系统配置',
        path: 'config',
        component: './System/Config/List',
        access: 'SYSTEM_CONFIG_VIEW',
      },
      {
        name: '系统日志',
        path: 'logs',
        component: './System/OperatorLog/List',
        access: 'SYSTEM_LOG_VIEW',
      },
    ],
  },
  {
    path: '/account',
    name: '个人中心',
    icon: 'user',
    component: './Account/Center',
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
