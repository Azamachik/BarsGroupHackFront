import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
    CircularProgress
} from '@mui/material';
import { ICourse, IModule, ILesson } from '../types/types';

interface CourseDialogProps {
    open: boolean;
    type: 'course' | 'module' | 'lesson' | null;
    context: { courseId?: string; moduleId?: string } | null;
    editItem: ICourse | IModule | ILesson | null;
    title: string;
    description: string;
    contentType: 'text' | 'video' | 'quiz';
    content: string;
    quizQuestions: any[];
    onClose: () => void;
    onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDescriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onContentTypeChange: (value: 'text' | 'video' | 'quiz') => void;
    onContentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onQuizQuestionsChange: (questions: any[]) => void;
    onSubmit: () => void;
    loading: boolean;
}

const CourseDialog: React.FC<CourseDialogProps> = ({
                                                       open,
                                                       type,
                                                       context,
                                                       editItem,
                                                       title,
                                                       description,
                                                       contentType,
                                                       content,
                                                       quizQuestions,
                                                       onClose,
                                                       onTitleChange,
                                                       onDescriptionChange,
                                                       onContentTypeChange,
                                                       onContentChange,
                                                       onQuizQuestionsChange,
                                                       onSubmit,
                                                       loading
                                                   }) => {
    const getDialogTitle = () => {
        if (!type) return '';
        const action = editItem ? 'Редактирование' : 'Создание';
        const itemType =
            type === 'course' ? 'курса' :
                type === 'module' ? 'модуля' : 'урока';
        return `${action} ${itemType}`;
    };

    const renderContentFields = () => {
        if (type !== 'lesson') return null;

        return (
            <>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Тип контента</InputLabel>
                    <Select
                        value={contentType}
                        onChange={(e) => onContentTypeChange(e.target.value as 'text' | 'video' | 'quiz')}
                        label="Тип контента"
                    >
                        <MenuItem value="text">Текст</MenuItem>
                        <MenuItem value="video">Видео</MenuItem>
                        <MenuItem value="quiz">Тест</MenuItem>
                    </Select>
                </FormControl>

                {contentType === 'text' && (
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Текст урока"
                        multiline
                        rows={4}
                        value={content}
                        onChange={onContentChange}
                    />
                )}

                {contentType === 'video' && (
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Ссылка на видео"
                        value={content}
                        onChange={onContentChange}
                    />
                )}

                {contentType === 'quiz' && (
                    <Box>
                        {/* Здесь должна быть реализация редактирования вопросов теста */}
                        {/* Это упрощенная версия - в реальном проекте нужно сделать полноценный редактор */}
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Вопросы теста (JSON)"
                            multiline
                            rows={4}
                            value={JSON.stringify(quizQuestions, null, 2)}
                            onChange={(e) => {
                                try {
                                    onQuizQuestionsChange(JSON.parse(e.target.value));
                                } catch (err) {
                                    console.error('Invalid JSON');
                                }
                            }}
                        />
                    </Box>
                )}
            </>
        );
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>{getDialogTitle()}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    fullWidth
                    margin="normal"
                    label="Название"
                    value={title}
                    onChange={onTitleChange}
                />

                {type === 'course' && (
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Описание"
                        multiline
                        rows={3}
                        value={description}
                        onChange={onDescriptionChange}
                    />
                )}

                {renderContentFields()}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>
                    Отмена
                </Button>
                <Button
                    onClick={onSubmit}
                    variant="contained"
                    disabled={!title || loading}
                >
                    {loading ? <CircularProgress size={24} /> : editItem ? 'Сохранить' : 'Создать'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CourseDialog;