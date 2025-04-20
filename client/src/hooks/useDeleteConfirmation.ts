import { useState } from 'react';

export const useDeleteConfirmation = () => {
    const [deleteDialog, setDeleteDialog] = useState({
        open: false,
        type: '',
        data: { courseId: '', moduleId: '', lessonId: '' },
        title: '',
        message: ''
    });

    const handleDeleteClick = (type, ids) => {
        const messages = {
            course: 'Вы уверены, что хотите удалить этот курс? Это действие нельзя отменить.',
            module: 'Вы уверены, что хотите удалить этот модуль? Все уроки в нем будут удалены.',
            lesson: 'Вы уверены, что хотите удалить этот урок?'
        };

        setDeleteDialog({
            open: true,
            type,
            data: { ...ids },
            title: `Удаление ${type === 'course' ? 'курса' : type === 'module' ? 'модуля' : 'урока'}`,
            message: messages[type]
        });
    };

    return {
        deleteDialog,
        handleDeleteClick,
        handleCancelDelete: () => setDeleteDialog({ ...deleteDialog, open: false })
    };
};