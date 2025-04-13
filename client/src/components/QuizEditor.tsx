import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Checkbox,
    FormControlLabel
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { IQuizQuestion, IAnswerOption, IQuizEditorProps } from '../types/types';

const QuizEditor: React.FC<IQuizEditorProps> = ({ questions, onQuestionsChange }) => {
    const [editingQuestion, setEditingQuestion] = useState<IQuizQuestion | null>(null);

    const handleAddQuestion = () => {
        const newQuestion: IQuizQuestion = {
            id: `q-${Date.now()}`,
            question: '',
            options: [
                { id: `o-${Date.now()}-1`, text: '', isCorrect: false },
                { id: `o-${Date.now()}-2`, text: '', isCorrect: false }
            ],
        };
        onQuestionsChange([...questions, newQuestion]);
        setEditingQuestion(newQuestion);
    };

    const handleQuestionChange = (id: string, field: keyof IQuizQuestion, value: string) => {
        const updated = questions.map(q =>
            q.id === id ? { ...q, [field]: value } : q
        );
        onQuestionsChange(updated);
        if (editingQuestion?.id === id) {
            setEditingQuestion(updated.find(q => q.id === id) || null);
        }
    };

    const handleOptionChange = (questionId: string, optionId: string, text: string) => {
        const updated = questions.map(q => {
            if (q.id !== questionId) return q;
            return {
                ...q,
                options: q.options.map(o =>
                    o.id === optionId ? { ...o, text } : o
                )
            };
        });
        onQuestionsChange(updated);
    };

    const handleToggleCorrect = (questionId: string, optionId: string) => {
        const updated = questions.map(q => {
            if (q.id !== questionId) return q;
            return {
                ...q,
                options: q.options.map(o =>
                    o.id === optionId ? { ...o, isCorrect: !o.isCorrect } : o
                )
            };
        });
        onQuestionsChange(updated);
    };

    const handleAddOption = (questionId: string) => {
        const updated = questions.map(q => {
            if (q.id !== questionId) return q;
            return {
                ...q,
                options: [
                    ...q.options,
                    { id: `o-${Date.now()}`, text: '', isCorrect: false }
                ]
            };
        });
        onQuestionsChange(updated);
    };

    const handleDeleteOption = (questionId: string, optionId: string) => {
        const updated = questions.map(q => {
            if (q.id !== questionId) return q;
            return {
                ...q,
                options: q.options.filter(o => o.id !== optionId)
            };
        });
        onQuestionsChange(updated);
    };

    const handleDeleteQuestion = (questionId: string) => {
        const updated = questions.filter(q => q.id !== questionId);
        onQuestionsChange(updated);
        if (editingQuestion?.id === questionId) {
            setEditingQuestion(null);
        }
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={handleAddQuestion}
                sx={{ mb: 3 }}
            >
                Добавить вопрос
            </Button>

            <Box sx={{ display: 'flex', gap: 3 }}>
                {/* Список вопросов */}
                <Box sx={{ width: '30%' }}>
                    <List>
                        {questions.map((q, index) => (
                            <ListItemButton
                                key={q.id}
                                selected={editingQuestion?.id === q.id}
                                onClick={() => setEditingQuestion(q)}
                                sx={{
                                    border: '1px solid #eee',
                                    borderRadius: 1,
                                    mb: 1,
                                    bgcolor: q.options.some(o => o.isCorrect) ? '#f5f5f5' : '#fff8e1'
                                }}
                            >
                                <ListItemText
                                    primary={`Вопрос ${index + 1}`}
                                    secondary={q.question || 'Новый вопрос'}
                                    secondaryTypographyProps={{ noWrap: true }}
                                />
                                <IconButton
                                    edge="end"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteQuestion(q.id);
                                    }}
                                >
                                    <Delete fontSize="small" />
                                </IconButton>
                            </ListItemButton>
                        ))}
                    </List>
                </Box>

                {/* Редактор вопроса */}
                {editingQuestion && (
                    <Box sx={{ width: '70%', p: 2, border: '1px solid #eee', borderRadius: 1 }}>
                        <TextField
                            label="Текст вопроса"
                            fullWidth
                            value={editingQuestion.question}
                            onChange={(e) =>
                                handleQuestionChange(editingQuestion.id, 'question', e.target.value)
                            }
                            sx={{ mb: 3 }}
                        />

                        <Typography variant="subtitle1" sx={{ mb: 2 }}>
                            Варианты ответов:
                        </Typography>

                        {editingQuestion.options.map((option, idx) => (
                            <Box
                                key={option.id}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    mb: 2
                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={option.isCorrect}
                                            onChange={() =>
                                                handleToggleCorrect(editingQuestion.id, option.id)
                                            }
                                        />
                                    }
                                    label=""
                                />
                                <TextField
                                    fullWidth
                                    value={option.text}
                                    onChange={(e) =>
                                        handleOptionChange(
                                            editingQuestion.id,
                                            option.id,
                                            e.target.value
                                        )
                                    }
                                    placeholder={`Вариант ${idx + 1}`}
                                />
                                <IconButton
                                    onClick={() =>
                                        handleDeleteOption(editingQuestion.id, option.id)
                                    }
                                    disabled={editingQuestion.options.length <= 2}
                                >
                                    <Delete fontSize="small" />
                                </IconButton>
                            </Box>
                        ))}

                        <Button
                            startIcon={<Add />}
                            onClick={() => handleAddOption(editingQuestion.id)}
                            sx={{ mb: 3 }}
                        >
                            Добавить вариант
                        </Button>

                        {/*<TextField*/}
                        {/*    label="Объяснение (опционально)"*/}
                        {/*    fullWidth*/}
                        {/*    multiline*/}
                        {/*    rows={3}*/}
                        {/*    value={editingQuestion.explanation || ''}*/}
                        {/*    onChange={(e) =>*/}
                        {/*        handleQuestionChange(*/}
                        {/*            editingQuestion.id,*/}
                        {/*            e.target.value*/}
                        {/*        )*/}
                        {/*    }*/}
                        {/*/>*/}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default QuizEditor;