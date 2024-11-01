document.addEventListener('DOMContentLoaded', function () {
    let isEditMode = false;
    let edittingId;
    const tasks = [{
            id: 1,
            title: "Complete project report",
            description: "Prepare and submit the project report",
            dueDate: "2024-12-01",
            comments: []
        },
        {
            id: 2,
            title: "Team Meeting",
            description: "Get ready for the season",
            dueDate: "2024-12-01",
            comments: []
        },
        {
            id: 3,
            title: "Code Review",
            description: "Check partners code",
            dueDate: "2024-12-01",
            comments: []
        },
        {
            id: 4,
            title: "Deploy",
            description: "Check deploy steps",
            dueDate: "2024-12-01",
            comments: []
        }
    ];

    function loadTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        tasks.forEach(function (task) {
            const taskCard = document.createElement('div');
            taskCard.className = 'col-md-4 mb-3';
            taskCard.innerHTML = `
                <div class='card'>
                    <div class='card-body'>
                        <h5 class='card-title'>${task.title}</h5>
                        <p class='card-text'>${task.description}</p>
                        <p class='card-text'><small class='text-muted'>Due: ${task.dueDate}</small></p>
                        <button class='btn btn-info btn-sm comment-task' data-id="${task.id}">Add Comment</button>
                        <ul id='comments-${task.id}' class='list-group mt-2'></ul> 
                    </div> 
                    <div class='card-footer d-flex justify-content-between'>
                        <button class='btn btn-secondary btn-sm edit-task' data-id="${task.id}">Edit</button> 
                        <button class='btn btn-danger btn-sm delete-task' data-id="${task.id}">Delete</button> 
                    </div> 
                </div>`;
            
            // Load existing comments
            const commentsList = document.getElementById(`comments-${task.id}`);
            task.comments.forEach(comment => {
                const commentItem = document.createElement('li');
                commentItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                commentItem.textContent = comment;

                // Create delete button for the comment
                const deleteButton = document.createElement('button');
                deleteButton.className = 'btn btn-danger btn-sm';
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = function () {
                    commentsList.removeChild(commentItem);
                    task.comments.splice(task.comments.indexOf(comment), 1); // Remove from task comments array
                };

                commentItem.appendChild(deleteButton);
                commentsList.appendChild(commentItem);
            });

            taskList.appendChild(taskCard);
        });

        document.querySelectorAll('.edit-task').forEach(function (button) {
            button.addEventListener('click', handleEditTask);
        });

        document.querySelectorAll('.delete-task').forEach(function (button) {
            button.addEventListener('click', handleDeleteTask);
        });

        document.querySelectorAll('.comment-task').forEach(function (button) {
            button.addEventListener('click', function () {
                const taskId = parseInt(button.dataset.id);
                document.getElementById('save-comment').dataset.taskId = taskId; // Store the task ID
                const modal = new bootstrap.Modal(document.getElementById("commentModal"));
                modal.show();
            });
        });
    }

    function handleEditTask(event) {
        const taskId = parseInt(event.target.dataset.id);
        const task = tasks.find(t => t.id === taskId);
        
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-desc').value = task.description;
        document.getElementById('due-date').value = task.dueDate;

        isEditMode = true;
        edittingId = taskId;
        
        const modal = new bootstrap.Modal(document.getElementById("taskModal"));
        modal.show();
    }

    function handleDeleteTask(event) {
        const id = parseInt(event.target.dataset.id);
        const index = tasks.findIndex(t => t.id === id);
        
        tasks.splice(index, 1);
        
        loadTasks();
    }

    document.getElementById('task-form').addEventListener('submit', function (e) {
        e.preventDefault();
        
        const title = document.getElementById("task-title").value;
        const description = document.getElementById("task-desc").value;
        const dueDate = document.getElementById("due-date").value;

        if (isEditMode) {
            const task = tasks.find(t => t.id === edittingId);
            task.title = title;
            task.description = description;
            task.dueDate = dueDate;
        } else {
            const newTask = {
                id: tasks.length + 1,
                title: title,
                description: description,
                dueDate: dueDate,
                comments: []
            };
            
            tasks.push(newTask);
        }
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
        modal.hide();
        
        loadTasks();
    });

    document.getElementById('save-comment').addEventListener('click', function () {
        const commentText = document.getElementById('comment-text').value;
        
        if (commentText) {
            const taskId = parseInt(this.dataset.taskId);
            
            const commentsList = document.getElementById(`comments-${taskId}`);
            
            // Add the comment to the corresponding task's comments array
            const taskIndex = tasks.findIndex(t => t.id === taskId);
            
            tasks[taskIndex].comments.push(commentText);

            // Create a list item for the comment
            const commentItem = document.createElement('li');
            
            commentItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            
            commentItem.textContent = commentText;

            // Create delete button for the comment
            const deleteButton = document.createElement('button');
            
            deleteButton.className = 'btn btn-danger btn-sm';
            
            deleteButton.textContent = 'Delete';
            
            deleteButton.onclick = function () {
                commentsList.removeChild(commentItem);
                
                // Remove from the comments array
                tasks[taskIndex].comments.splice(tasks[taskIndex].comments.indexOf(commentText), 1);
                
                console.log(tasks[taskIndex].comments); // Debugging line to check comments array

             };

             commentItem.appendChild(deleteButton);

             commentsList.appendChild(commentItem);

             // Reset textarea and close modal
             document.getElementById('comment-text').value = '';
             const modalCommentInstance = bootstrap.Modal.getInstance(document.getElementById('commentModal'));
             modalCommentInstance.hide();
         }
     });

     loadTasks();
 });