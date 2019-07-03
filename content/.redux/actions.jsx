export const actions = {
    INIT_COLUMNS: "Initializes the column list from the db",
    ADD_COLUMN: "Creates a new column",
    RENAME_COLUMN: "Changes the name of the specified column",
    ADD_TASK: "Adds a new task to the specified column",

    DRAG_START: "User starts dragging an item",
    DRAG_END: "User ends dragging an item",
    DRAG_OVER: "User drags an item over another item"
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
 * 
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
 * @param {*} task If the passed in id is the tag ID (true) or column (false)
 * @param {*} id ID of the task or column being dragged
 */
export const dragStart = (task, id) => {
    return {
        type: actions.DRAG_START,
        task,
        id
    };
};

export const dragEnd = () => {
    return {
        type: actions.DRAG_END
    }
}

/**
 * @param {*} task If the passed in id is the tag ID (true) or column (false)
 * @param {*} id ID of the task or column being dragged
 */
export const dragEnter = (task, id) => {
    return {
        type: actions.DRAG_OVER,
        task,
        id
    }
}