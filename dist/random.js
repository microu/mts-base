function shuffle(arr) {
    return arr
        .map((item) => ({ sortValue: Math.random(), value: item }))
        .sort((a, b) => a.sortValue - b.sortValue)
        .map((item) => item.value);
}

const randomVersion = "0.0.7";

export { randomVersion, shuffle };
