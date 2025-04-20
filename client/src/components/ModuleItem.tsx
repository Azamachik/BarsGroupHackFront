import React from 'react';
import { ListItem, ListItemText, IconButton, Box, Tooltip } from '@mui/material';
import { Add, Edit, Delete, ExpandMore, ExpandLess } from '@mui/icons-material';

const ModuleItem = ({
                        module,
                        expanded,
                        onToggle,
                        onAddLesson,
                        onEditModule,
                        onDeleteModule
                    }) => {
    return (
        <ListItem
            secondaryAction={
                <Box>
                    <Tooltip title="Добавить урок">
                        <IconButton edge="end" onClick={onAddLesson}>
                            <Add />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Редактировать модуль">
                        <IconButton edge="end" onClick={onEditModule}>
                            <Edit />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Удалить модуль">
                        <IconButton edge="end" onClick={onDeleteModule}>
                            <Delete fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            }
            sx={{ bgcolor: '#f9f9f9', pl: 4, borderRadius: 1, mt: 1 }}
        >
            <IconButton onClick={onToggle}>
                {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
            <ListItemText primary={module.title} />
        </ListItem>
    );
};

export default ModuleItem;