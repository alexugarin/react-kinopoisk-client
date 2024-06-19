const API_KEY = 'ZWV0J2G-YZB41ZK-QX7JMP9-Y2QS06X'; // Замените на ваш фактический API ключ

interface FetchOptions {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  params?: Record<string, string | number>;
}

const fetchWithApiKey = async ({ endpoint, method = 'GET', body, params}: FetchOptions) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'X-API-KEY': API_KEY,
  });

  let url = new URL(endpoint);

  if (params) {
    //Если есть параметры, то добавляем в query
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key].toString()));
  }

  const config: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(url.toString(), config);
    if (!response.ok) {
      throw new Error('Ответ сервера не ОК');
    }
    return response.json();
  } catch (error) {
    console.error('Ошибка выполнения запроса:', error);
    throw error;
  }
};


export { fetchWithApiKey };
