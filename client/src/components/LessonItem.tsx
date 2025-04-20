import React from 'react';
import { ListItem, ListItemText, IconButton, Box, Tooltip } from '@mui/material';
import { Edit, Delete, Article, VideoLibrary, Quiz } from '@mui/icons-material';

const LessonItem = ({ lesson, onEditLesson, onDeleteLesson }) => {
    const renderIcon = () => {
        switch (lesson.content.type) {
            case 'text': return <Article fontSize="small" />;
            case 'video': return <VideoLibrary fontSize="small" />;
            case 'quiz': return <Quiz fontSize="small" />;
            default: return null;
        }
    };

    return (
        <ListItem
            secondaryAction={
                <Box>
                    <Tooltip title="Редактировать урок">
                        <IconButton edge="end" onClick={onEditLesson}>
                            <Edit />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Удалить урок">
                        <IconButton edge="end" onClick={onDeleteLesson}>
                            <Delete fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            }
            sx={{
                pl: 8,
                borderLeft: '3px solid',
                borderColor: lesson.content.type === 'text' ? '#4caf50' :
                    lesson.content.type === 'video' ? '#2196f3' : '#ff9800',
                mt: 1,
                borderRadius: 1
            }}
        >
            <Box sx={{ mr: 1 }}>{renderIcon()}</Box>
            <ListItemText
                primary={lesson.title}
                secondary={
                    lesson.content.type === 'text' ? `${lesson.content.content.substring(0, 50)}...` :
                        lesson.content.type === 'video' ? lesson.content.url :
                            `${lesson.content.questions.length} вопросов`
                }
            />
        </ListItem>
    );
};

export default LessonItem;