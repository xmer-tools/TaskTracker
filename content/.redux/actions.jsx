export const actions = {
    INIT_TASKS: "Initializes the task list from the db",
    ADD_TASK: "Creates a new task"
};

export const initTasks = tasks => {
    return {
        type: actions.INIT_TASKS,
        tasks
    };
};

export const addTask = task => {
    return {
        type: actions.ADD_TASK,
        task
    };
};