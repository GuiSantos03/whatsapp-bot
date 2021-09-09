

const usedCommandRecently = new Set();

const isFiltered = from => Boolean(!usedCommandRecently.has(from));

const addFilter = from => {
    usedCommandRecently.add(from);
    setTimeout(() => usedCommandRecently.delete(from), 10000); // 5sec is delay before processing next command
};

module.exports = {
    isFiltered,
    addFilter
};
