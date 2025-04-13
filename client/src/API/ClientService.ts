import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig
} from 'axios';

const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: false,
});

// Интерцептор запросов с правильными типами
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        // токен авторизации:
        // const token = localStorage.getItem('token');
        // if (token && config.headers) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
    }
);

// Интерцептор ответов с правильными типами
apiClient.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        // Можно обработать успешные ответы
        return response;
    },
    (error: AxiosError): Promise<AxiosError> => {
        if (error.response) {
            console.error('API Error:', {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers,
            });
        } else if (error.request) {
            console.error('API No Response:', error.request);
        } else {
            console.error('API Request Error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default apiClient;