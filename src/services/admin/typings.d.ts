declare namespace API {
  type Access = {
    id: number;
    /** 权限码 */
    code: string;
    /** 权限名 */
    name: string;
    description: string;
    /** 接口地址 */
    url?: any;
    parent_id?: any;
    /** 子权限 */
    children: any;
  };

  type Admin = {
    id: number;
    /** 昵称 */
    nickname: string;
    username: string;
    /** 头像 */
    avatar: string;
    /** 手机号 */
    phone_number: string;
    /** 所属部门 */
    department: string;
    /** 角色 */
    role_id: number;
    department_id: number;
    /** 权限码 */
    access_codes: string;
    /** 创建时间 */
    created_at: string;
    state: 0 | 1;
    password?: string;
  };

  type AnalysisData = {
    x: string;
    y: number;
  };

  type AssistantTag = {
    id: string;
    name: string;
    created_at?: string;
    sort_num: number;
    icon: string;
  };

  type ChatAssistant = {
    id: string;
    name: string;
    marker: string;
    desc: string;
    icon: string;
    enabled: number;
    sort_num: number;
    created_at: string;
    context_json: string;
    hello_msg: string;
    suggestions: string;
    user_id: string;
    is_delete: number;
    user: User;
  };

  type ChatHistory = {
    user_id: string;
    chat_id: string;
    type: string;
    icon: string;
    role_id: number;
    content: string;
    tokens: number;
    use_context: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
  };

  type ChatModel = {
    platform: string;
    name: string;
    value: string;
    sort_num: string;
    enabled: number;
    weight: string;
    open: string;
    created_at: string;
    updated_at: string;
    id: string;
    key_id: string;
    magnification: string;
    vision: string;
  };

  type ChatPlan = {
    id: string;
    title: string;
    content: null;
    tokens: number;
    price: string;
    desc: null;
    enable: number;
    origin_price: string;
    created_at: string;
    updated_at: string;
  };

  type ChatPlatform = {
    id: string;
    platform: string;
    name: string;
    value: string;
    type: string;
    desc: number;
    api_url: string;
    enabled: number;
    use_proxy: number;
    created_at: string;
    updated_at: string;
    icon: string;
  };

  type CollectTool = {
    name: string;
    link: string;
    desc: string;
    status: 'not_in' | 'collected' | 'published';
    ip: string;
    user_id: string;
    contact: string;
    user: User;
    id: number;
  };

  type Column = {
    id: number;
    name: string;
    sort: string;
    desc: string;
  };

  type Config = {
    password_login_enable: boolean;
    wechat_login_enable: boolean;
    sms_login_enable: boolean;
    sms_config: { web_url: string; web_user: string; web_pwd: string; header: string };
    mail_enable: boolean;
    mail_config: { host: string; user: string; pass: string };
    captcha_enable: string;
    captcha_config: { type: 'image' | 'geetest'; id: string; key: string };
    file_url: string;
    website_url: string;
    pay_config: {
      type: 'Person' | 'Enterprise';
      alipay_qrcode: string;
      wechat_qrcode: string;
      alipay_enable: boolean;
      wechat_enable: boolean;
    };
  };

  type deleteChatApiKeyParams = {
    /** 菜单id */
    id: number;
  };

  type deleteChatModelsParams = {
    /** 菜单id */
    id: number;
  };

  type deleteChatRoleParams = {
    /** 菜单id */
    id: string;
  };

  type deleteChatRoleTagParams = {
    /** 菜单id */
    id: string;
  };

  type deleteMenuParams = {
    /** 菜单id */
    id: number;
  };

  type deletePostParams = {
    id?: number;
  };

  type deleteSystemAccessParams = {
    id?: number;
  };

  type deleteSystemDepartmentParams = {
    id?: number;
  };

  type deleteSystemRoleParams = {
    id?: number;
  };

  type Department = {
    id: number;
    parent_id: number;
    name: string;
    leader: string;
    children: Department[];
  };

  type FeedbackTool = {
    type: string;
    detail: string;
    ip: string;
    user_id: string;
    user: User;
    tool: Tool;
    status: 'unprocessed' | 'checked' | 'invalid' | 'processed';
    id: number;
  };

  type getAnalysisVisitByTimeParams = {
    start_time?: string;
    end_time?: string;
    /** day | week | month | year 日 周 月 年 */
    range_time?: string;
  };

  type getChatApiKeyListParams = {
    name?: string;
  };

  type getChatHistoryListParams = {
    user_id?: string;
    chat_id?: string;
  };

  type getChatItemListParams = {
    title?: string;
  };

  type getChatModelsListParams = {
    name?: string;
    platform?: string;
  };

  type getChatRoleListParams = {
    name?: string;
  };

  type getIterationsListParams = {
    id?: string;
  };

  type getIterationsParams = {
    id?: number;
  };

  type getMenuListParams = {
    parent_id?: number;
  };

  type getOrderListParams = {
    page?: string;
    page_size?: string;
  };

  type getPageListParams = {
    id?: string;
    alias?: string;
    desc?: string;
  };

  type getPageParams = {
    id?: number;
  };

  type getPostListParams = {
    page_size?: number;
    page?: number;
    /** 通过栏目id查询 */
    column_id?: number;
  };

  type getPostParams = {
    id?: number;
  };

  type getRankSourceParams = {
    source_type?: string;
    start_time?: string;
    end_time?: string;
  };

  type getShopParams = {
    id?: number;
  };

  type getSystemAdminListParams = {
    role_id?: number;
    department_id?: number;
    phone_number?: string;
    page?: number;
    page_size?: number;
    nickname?: string;
    username?: string;
  };

  type getSystemLogsParams = {
    page?: string;
    pageSize?: string;
  };

  type getUserHistoryEmailParams = {
    scene?: string;
    user_id?: string;
    page?: string;
  };

  type getUserHistoryLikeParams = {
    user_id?: string;
  };

  type getUserHistoryLoginParams = {
    user_id?: string;
  };

  type getUserHistorySmsParams = {
    scene?: string;
    user_id?: string;
    page?: string;
  };

  type getUserListParams = {
    page?: number;
    page_size?: number;
    /** 手机号查询 */
    phone?: string;
    /** 用户名查询 */
    nickname?: string;
    email?: string;
  };

  type Iteration = {
    id: string;
    /** 版本号 */
    version: string;
    /** 发布内容 */
    content: string;
    /** 发布时间 */
    date: string;
    /** 模块 */
    modules: string;
    /** 状态 */
    status: string;
    /** 发布人 */
    persons: string;
    /** 内容列表 */
    title: string;
  };

  type Menu = {
    id: number;
    name: string;
    sort: number;
    target_type: 'origin' | 'site';
    link?: any;
    parent_id?: any;
    children: Menu[];
  };

  type OperatorLog = {
    id: number;
    user_id: number;
    remark: string;
    created_at: string;
    user: Admin;
  };

  type Page = {
    id: number;
    /** 说明 */
    desc: string;
    /** 访问别名 */
    alias: string;
    content: string;
    /** 页面title */
    title: string;
  };

  type PageData = {
    list: any[];
    /** 数据总数 */
    total: number;
    /** 当前页码 */
    current: number;
    /** 每页总数 */
    size: number;
  };

  type Post = {
    id: number;
    title: string;
    /** 文章描述 */
    desc: string;
    /** 文章内容 */
    content: string;
    /** 栏目信息 */
    column: Column;
    /** 点赞数 */
    like_count: string;
    /** 评论数 */
    comment_count: string;
    /** 观看数 */
    view_count: string;
    /** 创建时间 */
    created_at: string;
    cover: string;
  };

  type postUserAddTokenParams = {
    user_id?: string;
    tokens?: number;
    type?: string;
  };

  type Role = {
    id: number;
    role_name: string;
    created_at: string;
    updated_at: string;
    /** 权限码 */
    access_codes: string;
    /** 权限id */
    access_ids: string;
  };

  type SmsHistory = {
    id: number;
    scene: 'reset' | 'login' | 'bind' | 'signup';
    phone: string;
    code: string;
    ip: string;
  };

  type Tool = {
    id: number;
    name: string;
    /** 图标 */
    icon: string;
    /** 封面 */
    cover: string;
    link: string;
    /** 跳转类型 */
    target_type: 'origin' | 'site';
    /** 点赞数 */
    like_count: number;
    /** 评论数 */
    comment_count: number;
    /** 描述 */
    desc: string;
    /** 内容 */
    content: string;
    /** 标签 */
    tags: Record<string, any>[];
    sort: string;
    attr: string;
    cert: string;
  };

  type User = {
    id: string;
    /** 昵称 */
    nickname: string;
    /** 头像 */
    avatar: string;
    phone_number: string;
    /** 创建时间 */
    created_at: string;
    last_ip: string;
    tokens: number;
  };

  type ViewHistory = {
    page: string;
    user: User;
    details: string;
    time: string;
    source_id: number;
    source_type: string;
    source: any;
    ip: string;
  };
}
