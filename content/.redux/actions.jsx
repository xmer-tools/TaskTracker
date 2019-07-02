export const actions = {
    INIT_COLUMNS: "Initializes the column list from the db",
    ADD_COLUMN: "Creates a new column",
    RENAME_COLUMN: "Changes the name of the specified column",
    ADD_TASK: "Adds a new task to the specified column",
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
    }
}