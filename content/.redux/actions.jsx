export const actions = {
    INIT_COLUMNS: "Initializes the column list from the db",
    ADD_COLUMN: "Creates a new column",
    RENAME_COLUMN: "Changes the name of the specified column",
    ADD_TASK: "Adds a new task to the specified column",
    RENAME_TASK: "Changes the name of the specified task",

    DRAG_START: "User starts dragging an item",
    DRAG_END: "User ends dragging an item",
    DRAG_OVER_COLUMN: "User dragged an item over a column",
    DRAG_OVER_TRASH: "User dragged the item over the trash can",

    MOVE_TASK: "Moves a task from one column to another",
    REMOVE_TASK: "Removes a task from the list"
};

export const initColumns = columns => {
    return {
        type: actions.INIT_COLUMNS,
        columns
    };
};

export const addColumn = column => {
    return {
        type: actions.ADD_COLUMN,
        column
    };
};

/**
 * @param {*} id Column ID
 * @param {*} title New Column Title
 */
export const renameColumn = (id, title) => {
    return {
        type: actions.RENAME_COLUMN,
        id,
        title
    };
};

/**
 * @param {*} id Column ID
 * @param {*} title Title of the new task
 */
export const addTask = (id, title) => {
    return {
        type: actions.ADD_TASK,
        id,
        title
    };
};

/**
 * @param {*} columnId ID of the column being dragged or dragged from
 * @param {*} taskId ID of the task being dragged (if any)
 */
export const dragStart = (columnId, taskId) => {
    return {
        type: actions.DRAG_START,
        columnId,
        taskId
    };
};

export const dragEnd = () => {
    return {
        type: actions.DRAG_END
    }
}

/**
 * @param {*} id ID of the column being dragged over
 */
export const dragColumnEnter = id => {
    return {
        type: actions.DRAG_OVER_COLUMN,
        id
    }
}

/**
 * @param {*} id task id being moved
 * @param {*} from column id
 * @param {*} to column id
 */
export const moveTask = (id, from, to) => {
    return {
        type: actions.MOVE_TASK,
        id,
        from,
        to
    }
}

/**
 * @param {*} colId column where the task resides
 * @param {*} taskId id of the task being renamed
 * @param {*} title new title for the task
 */
export const renameTask = (colId, taskId, title) => {
    return {
        type: actions.RENAME_TASK,
        colId,
        taskId,
        title
    }
}

/**
 * @param {*} task Task ID being removed
 * @param {*} col Column ID that task currently belongs to
 */
export const removeTask = (task, col) => {
    return {
        type: actions.REMOVE_TASK,
        task,
        col
    }
}

export const overTrash = () => {
    return {
        type: actions.DRAG_OVER_TRASH
    }
}