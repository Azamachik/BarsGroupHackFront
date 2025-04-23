import { useState, useEffect } from 'react';
import apiClient from '../API/ClientService';
import { IUser } from '../types/types';

interface AnalyticsData {
    users: IUser[];
    overallStats: {
        total: number;
        active: number;
        excellent: number;
        good: number;
        average: number;
        weak: number;
    };
    monthlyActivity: {
        month: string;
        activeUsers: number;
    }[];
    courseStats?: {
        courseId: string;
        totalAttempts: number;
        averageScore: number;
    };
}

interface TestResultData {
    userId: number;
    courseId: string;
    moduleId: string;
    lessonId: string;
    score: number;
}

const useAnalyticsApi = () => {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Получение общей статистики
    const fetchOverallStats = async () => {
        try {
            const response = await apiClient.get('/analytics/overall');
            return response.data;
        } catch (err) {
            throw new Error('Не удалось загрузить общую статистику');
        }
    };

    // Получение индивидуальной статистики
    const fetchIndividualStats = async () => {
        try {
            const response = await apiClient.get('/analytics/individual');
            return response.data;
        } catch (err) {
            throw new Error('Не удалось загрузить индивидуальную статистику');
        }
    };

    // Получение данных активности
    const fetchActivityData = async (year: string) => {
        try {
            const response = await apiClient.get(`/analytics/activity?year=${year}`);
            return response.data;
        } catch (err) {
            throw new Error('Не удалось загрузить данные активности');
        }
    };

    // Получение данных по курсу
    const fetchCourseStats = async (courseId: string) => {
        try {
            const response = await apiClient.get(`/analytics/course/${courseId}`);
            return response.data;
        } catch (err) {
            throw new Error('Не удалось загрузить статистику по курсу');
        }
    };

    // Сохранение результата теста
    const saveTestResult = async (resultData: TestResultData) => {
        try {
            const response = await apiClient.post('/test-results', resultData);
            return response.data;
        } catch (err) {
            throw new Error('Не удалось сохранить результат теста');
        }
    };

    // Загрузка всех данных аналитики
    const loadAnalyticsData = async (year: string, courseId: string) => {
        setLoading(true);
        setError(null);

        try {
            const [overallStats, individualStats, activityData] = await Promise.all([
                fetchOverallStats(),
                fetchIndividualStats(),
                fetchActivityData(year),
            ]);

            let courseStats = null;
            if (courseId !== 'all') {
                courseStats = await fetchCourseStats(courseId);
            }

            setData({
                users: individualStats,
                overallStats: {
                    ...overallStats,
                    ...(courseStats || {}),
                },
                monthlyActivity: activityData,
                ...(courseStats ? { courseStats } : {}),
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        } finally {
            setLoading(false);
        }
    };

    // Обновление данных при изменении фильтров
    const refreshData = () => {
        if (data) {
            const year = '2023'; // или из текущих фильтров
            const courseId = 'all'; // или из текущих фильтров
            loadAnalyticsData(year, courseId);
        }
    };

    return {
        data,
        loading,
        error,
        loadAnalyticsData,
        saveTestResult,
        refreshData,
    };
};

export default useAnalyticsApi;