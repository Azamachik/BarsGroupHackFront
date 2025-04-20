import React from 'react';
import { ListItem, ListItemText, IconButton, Box, Tooltip } from '@mui/material';
import { Add, Edit, Delete, ExpandMore, ExpandLess } from '@mui/icons-material';

const CourseItem = ({
                        course,
                        expanded,
                        onToggle,
                        onAddModule,
                        onEditCourse,
                        onDeleteCourse
                    }) => {
    return (
        <ListItem
            secondaryAction={
                <Box>
                    <Tooltip title="Добавить модуль">
                        <IconButton edge="end" onClick={onAddModule}>
                            <Add/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Редактировать курс">
                        <IconButton edge="end" onClick={onEditCourse}>
                            <Edit/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Удалить курс">
                        <IconButton edge="end" onClick={onDeleteCourse}>
                            <Delete fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                </Box>
            }
            sx={{bgcolor: '#f5f5f5', mt: 1, borderRadius: 1}}
        >
            <IconButton onClick={onToggle}>
                {expanded ? <ExpandLess/> : <ExpandMore/>}
            </IconButton>
            <ListItemText primary={course.title} secondary={course.description}/>
        </ListItem>
    );
};

export default CourseItem;