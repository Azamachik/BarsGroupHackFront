import { LineChart } from '@mui/x-charts';
import { Box, Paper, Typography, FormControl, InputLabel, Select, MenuItem, CircularProgress, Alert } from '@mui/material';
import React, { useState, useEffect } from 'react';
import MySpinner from "../UI/spinner/MySpinner";

interface ActivityTabProps {
    activity: {
        month: string;
        activeUsers: number;
    }[];
    filters: {
        year: string;
        courseId: string;
    };
    onFilterChange: (name: string, value: string) => void;
}

const ActivityTab = ({ activity, filters, onFilterChange }: ActivityTabProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Имитация загрузки при смене года
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, [filters.year]);

    if (loading) return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
            <MySpinner />
        </Box>
    );
    if (error) return (
        <Alert severity="error">
            Ошибка загрузки данных: {error}
        </Alert>
    )
    return (
        <Paper sx={{ p: 2, mt: 2 }}>
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="h6">Динамика активности студентов</Typography>
                <Box display="flex" gap={2}>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Год</InputLabel>
                        <Select
                            value={filters.year}
                            onChange={(e) => onFilterChange('year', e.target.value)}
                            label="Год"
                        >
                            <MenuItem value="2023">2023</MenuItem>
                            <MenuItem value="2022">2022</MenuItem>
                            <MenuItem value="2021">2021</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Предмет</InputLabel>
                        <Select
                            value={filters.courseId}
                            onChange={(e) => onFilterChange('courseId', e.target.value)}
                            label="Предмет"
                        >
                            <MenuItem value="all">Все предметы</MenuItem>
                            <MenuItem value="1">Основы программирования</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            {activity && activity.length > 0 ? (
                <LineChart
                    xAxis={[{
                        data: activity.map(item => item.month),
                        scaleType: 'band',
                        label: 'Месяц'
                    }]}
                    series={[
                        {
                            data: activity.map(item => item.activeUsers),
                            label: 'Активные студенты',
                            area: true,
                            color: '#1976d2'
                        },
                    ]}
                    width={800}
                    height={400}
                />
            ) : (
                <Typography>Нет данных для отображения</Typography>
            )}
        </Paper>
    );
};

export default ActivityTab;