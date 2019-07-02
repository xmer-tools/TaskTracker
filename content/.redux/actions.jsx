export const actions = {
    INIT_COLUMNS: "Initializes the column list from the db",
    ADD_COLUMN: "Creates a new column"
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