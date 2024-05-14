import { isDev } from './utils/const';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.Admin } | undefined) {
  const { currentUser } = initialState ?? {};
  if (isDev && localStorage.getItem('ACCESS_OPEN') === '0') {
    return new Proxy(
      {},
      {
        get: () => true,
      },
    ) as Record<string, boolean>;
  }
  const accessCodes = currentUser?.access_codes?.split(',') ?? [];
  return {
    ...accessCodes.reduce<Record<string, boolean>>((acc, cur) => {
      acc[cur] = true;
      acc[cur.split('_')?.[0]] = true;
      return acc;
    }, {}),
  };
}
