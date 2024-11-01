document.addEventListener('DOMContentLoaded', function () {
    let isEditMode = false;
    let editingId;
    let editingCommentIndex = null;

    const tasks = [
        {
            id: 1,
            title: "Complete project report",
            description: "Prepare and submit the project report",
            dueDate: "2024-12-01",
            comments: [{ id: 1, text: "Remember to check spelling" }]
        },
        {
            id: 2,
            title: "Team Meeting",
            description: "Get ready for the season",
            dueDate: "2024-12-01",
            comments: [{ id: 1, text: "Confirm attendance with everyone" }]
        },
        {
            id: 3,
            title: "Code Review",
            description: "Check partner's code",
            dueDate: "2024-12-01",
            comments: [{ id: 1, text: "Focus on edge cases" }]
        },
        {
            id: 4,
            title: "Deploy",
            description: "Check deploy steps",
            dueDate: "2024-12-01",
            comments: [{ id: 1, text: "Run final tests" }]
        }
    ];

    function loadTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        tasks.forEach(function (task) {
            const taskCard = document.createElement('div');
            taskCard.className = 'col-md-4 mb-3';
            taskCard.innerHTML = `
                <div class='card' style='background-color: #f0f9ff; border: 1px solid #cce7ff;'>
                    <div class='card-body'>
                        <h5 class='card-title'>${task.title}</h5>
                        <p class='card-text text-secondary'>${task.description}</p>
                        <p class='card-text'><small class='text-muted'>Due: ${task.dueDate}</small></p>
                        <button class='btn btn-info btn-sm comment-task' data-id="${task.id}">Add Comment</button>
                        <ul id='comments-${task.id}' class='list-group mt-2'></ul> 
                    </div> 
                    <div class='card-footer d-flex justify-content-between'>
                        <button class='btn btn-secondary btn-sm edit-task' data-id="${task.id}">Edit</button> 
                        <button class='btn btn-danger btn-sm delete-task' data-id="${task.id}">Delete</button> 
                    </div> 
                </div>`;

            const commentsList = taskCard.querySelector(`#comments-${task.id}`);
            task.comments.forEach(comment => {
                const commentItem = document.createElement('li');
                commentItem.className = 'list-group-item';
                commentItem.style.backgroundColor = '#e6f7ff';
                commentItem.style.border = '1px solid #cce7ff';
                commentItem.innerHTML = `
                    <div style="white-space: pre-wrap; color: #595959;">${comment.text}</div>
                    <div class="text-end mt-2">
                        <button class="btn btn-outline-secondary btn-sm edit-comment" data-task-id="${task.id}" data-comment-id="${comment.id}">Edit</button>
                        <button class="btn btn-outline-danger btn-sm delete-comment" data-task-id="${task.id}" data-comment-id="${comment.id}">Delete</button>
                    </div>`;

                commentsList.appendChild(commentItem);
            });

            taskList.appendChild(taskCard);
        });

        document.querySelectorAll('.edit-task').forEach(button => button.addEventListener('click', handleEditTask));
        document.querySelectorAll('.delete-task').forEach(button => button.addEventListener('click', handleDeleteTask));
        document.querySelectorAll('.comment-task').forEach(button => button.addEventListener('click', openCommentModal));
        document.querySelectorAll('.edit-comment').forEach(button => button.addEventListener('click', handleEditComment));
        document.querySelectorAll('.delete-comment').forEach(button => button.addEventListener('click', handleDeleteComment));
    }

    function openCommentModal(event) {
        const taskId = parseInt(event.target.dataset.id);
        document.getElementById('save-comment').dataset.taskId = taskId;
        editingCommentIndex = null;
        document.getElementById('comment-text').value = '';
        new bootstrap.Modal(document.getElementById('commentModal')).show();
    }

    function handleEditTask(event) {
        const taskId = parseInt(event.target.dataset.id);
        const task = tasks.find(t => t.id === taskId);

        document.getElementById('task-title').value = task.title;
        document.getElementById('task-desc').value = task.description;
        document.getElementById('due-date').value = task.dueDate;

        editingId = taskId;
        isEditMode = true;

        new bootstrap.Modal(document.getElementById('taskModal')).show();
    }

    function handleEditComment(event) {
        const taskId = parseInt(event.target.dataset.taskId);
        const commentId = parseInt(event.target.dataset.commentId);
        const task = tasks.find(t => t.id === taskId);

        editingCommentIndex = task.comments.findIndex(c => c.id === commentId);
        document.getElementById('comment-text').value = task.comments[editingCommentIndex].text;
        document.getElementById('save-comment').dataset.taskId = taskId;

        new bootstrap.Modal(document.getElementById('commentModal')).show();
    }

    function handleDeleteTask(event) {
        const taskId = parseInt(event.target.dataset.id);
        const taskIndex = tasks.findIndex(t => t.id === taskId);
        tasks.splice(taskIndex, 1);
        loadTasks();
    }

    function handleDeleteComment(event) {
        const taskId = parseInt(event.target.dataset.taskId);
        const commentId = parseInt(event.target.dataset.commentId);
        const task = tasks.find(t => t.id === taskId);
        const commentIndex = task.comments.findIndex(c => c.id === commentId);
        task.comments.splice(commentIndex, 1);
        loadTasks();
    }

    document.getElementById('task-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-desc').value;
        const dueDate = document.getElementById('due-date').value;

        if (isEditMode) {
            const task = tasks.find(t => t.id === editingId);
            task.title = title;
            task.description = description;
            task.dueDate = dueDate;
            isEditMode = false;
        } else {
            tasks.push({ id: tasks.length + 1, title, description, dueDate, comments: [] });
        }

        document.getElementById('task-form').reset();
        loadTasks();
        bootstrap.Modal.getInstance(document.getElementById('taskModal')).hide();
    });

    document.getElementById('save-comment').addEventListener('click', function () {
        const taskId = parseInt(this.dataset.taskId);
        const commentText = document.getElementById('comment-text').value;

        const task = tasks.find(t => t.id === taskId);
        if (editingCommentIndex !== null) {
            task.comments[editingCommentIndex].text = commentText;
        } else {
            task.comments.push({ id: task.comments.length + 1, text: commentText });
        }

        loadTasks();
        bootstrap.Modal.getInstance(document.getElementById('commentModal')).hide();
    });

    loadTasks();
});
