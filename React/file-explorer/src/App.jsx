import { useState } from 'react'
import './App.css'
import Folder from './components/Folder'
import folderData from './data/folderData'
import useTraverseTree from './hooks/use-traverse-tree'

function App() {
  const [explorerData, setExplorerData] = useState(folderData)
  const { insertNode } = useTraverseTree();

  function handleInsetNode(folderId, item, isFolder) {
    const finalTree = insertNode(folderData, folderId, item, isFolder);
    setExplorerData(finalTree);
  }

  return (
    <>
      <Folder folderData={explorerData} handleInsetNode={handleInsetNode} />
    </>
  )
}

export default App
