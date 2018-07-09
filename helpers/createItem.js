export const createItems = () => {
    let items = [];
    for (let i = 1; i <= 300; i++){
        items.push(`Элемент ${i}`);
    }
    return items;
}