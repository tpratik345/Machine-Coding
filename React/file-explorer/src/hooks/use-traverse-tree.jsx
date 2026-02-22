const useTraverseTree = () => {
    function insertNode(tree, folderId, item, isFolder) {
        if (tree.id === folderId && tree.isFolder) {
            tree.items.unshift({
                id: Date.now(),
                name: item,
                isFolder,
                item: []
            })
            return tree;
        }

        let lastestNode = [];
        lastestNode = tree?.items?.map((ob) => {
            return insertNode(ob, folderId, item, isFolder);
        })

        return { ...tree, items: lastestNode };
    }

    // To Be Done... 
    const deleteNode = () => {}
    const updateNode = () => {}

    return { insertNode }
}

export default useTraverseTree;