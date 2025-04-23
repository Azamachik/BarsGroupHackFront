import { useState, useEffect } from 'react';
import { Tabs, Tab, Box, CircularProgress, Alert } from '@mui/material';
import useAnalytics from "../hooks/useAnalytics";
import GeneralStatsTab from "./AnalyticsTabs/GeneralStatsTab";
import IndividualStatsTab from "./AnalyticsTabs/IndividualStatsTab";
import ActivityTab from "./AnalyticsTabs/ActivityTab";

const Analytics = () => {
    const [tabValue, setTabValue] = useState(0);
    const [filters, setFilters] = useState({
        year: '2023',
        courseId: 'all',
    });

    const { data, loading, error, loadAnalyticsData } = useAnalytics();

    useEffect(() => {
        loadAnalyticsData(filters.year, filters.courseId);
    }, [filters.year, filters.courseId]);

    const handleFilterChange = (name: string, value: string) => {
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    if (loading) return <CircularProgress sx={{ display: 'block', mt: 4, mx: 'auto' }} />;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!data) return <Alert severity="info">Нет данных для отображения</Alert>;

    return (
        <Box sx={{ p: 1 }}>
            <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
                <Tab label="Общая статистика" />
                <Tab label="Индивидуальная" />
                <Tab label="Динамика активности" />
            </Tabs>

            {tabValue === 0 && (
                <GeneralStatsTab
                    stats={data.overallStats}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                />
            )}

            {tabValue === 1 && (
                <IndividualStatsTab
                    users={data.users}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                />
            )}

            {tabValue === 2 && (
                <ActivityTab
                    activity={data.monthlyActivity}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                />
            )}
        </Box>
    );
};

export default Analytics;