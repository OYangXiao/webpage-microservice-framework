import { message } from 'ant-design-vue';

//@ts-ignore
const BASE_API_PATH = window.location.origin + '/' + import.meta.env.DEV ? 'vulcan-dev' : 'vulcan-web';

console.log(import.meta)

const jsonHeader = {
  'content-type': 'application/json;charset=UTF-8',
  Accept: 'application/json, text/plain, */*',
};

/**
 * post方法，对应post请求
 */
export const getFetch = async <T>(description: string, url: string, data?: Record<string, string> | undefined) => {
  console.log();
  const res = await fetch(BASE_API_PATH + '/' + url + (data ? `?${new URLSearchParams(data)}` : ''), {
    method: 'GET',
    credentials: 'same-origin',
    headers: jsonHeader,
  }).catch((e) => new Error(e));
  return processRes<T>(description, res);
};

export const postFetch = async <T>(description: string, url: string, data?: Record<string, any> | undefined) => {
  const res = await fetch(`${BASE_API_PATH}/${url}`, {
    method: 'POST',
    body: JSON.stringify(data),
    credentials: 'same-origin',
    headers: jsonHeader, // 请求头，发送FormData格式的数据，必须是 这种请求头。
  }).catch((e) => new Error(e));
  return processRes<T>(description, res);
};

export const postFormDataFetch = async <T>(description: string, url: string, data: Record<string, any>) => {
  const body = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    body.append(key, value);
  });
  const res = await fetch(`${BASE_API_PATH}/${url}`, {
    method: 'POST',
    body,
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Accept: 'application/json, text/plain, */*',
    },
  });
  return processRes<T>(description, res);
};

interface CommonResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

const processRes = async <T>(description: string, res: Response | Error): Promise<{ ok: T } | null> => {
  if (res instanceof Error) {
    message.error(`${description} 发生网络错误，信息为：${res.message}`);
    return null;
  } else if (res.status === 401) {
    // TODO: clear user and goto login page
    return null;
  } else if (res.status >= 500) {
    message.error(`${description} 导致服务器内部错误，信息为：${res.text}`);
    return null;
  } else if (res.ok) {
    const resContent = (await res.json()) as CommonResponse<T>;
    return { ok: resContent.data };
  } else {
    console.error('unknown error', res);
    return null;
  }
};
