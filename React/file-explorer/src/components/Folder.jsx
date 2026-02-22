import { useState } from 'react'
import './Folder.css'

function Folder({ folderData, handleInsetNode }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    folder: null
  })

  function handleClick(e, isFolder) {
    e.stopPropagation();
    setExpand(true)
    setShowInput({ visible: true, folder: isFolder })
  }

  function onAddFolder(e, folderId) {
    console.log(e.target.value)
    if (e.key === 'Enter' && e.target.value) {
      setShowInput({ ...showInput, visible: false })
      handleInsetNode(folderId, e.target.value, showInput.folder)
    }
  }

  if (folderData.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className='folder' onClick={() => setExpand(!expand)}>
          <span>📁 {folderData.name}</span>
          <div>
            <button onClick={(e) => handleClick(e, true)}>Folder +</button>
            <button onClick={(e) => handleClick(e, false)}>File +</button>
          </div>
        </div>
        <div style={{ display: expand ? 'block' : 'none', paddingLeft: 20 }}>
          {showInput.visible &&
            <div className='input-container'>
              <span>{showInput.folder ? '📁' : '📝'}</span>
              <input
                type='text'
                className='input'
                autoFocus
                onBlur={() => setShowInput({ visible: false, isFolder: null })}
                onKeyDown={(e) => onAddFolder(e, folderData.id)}
              />
            </div>
          }
          { 
            folderData?.items?.map((item) => {
              return <Folder key={item.id} folderData={item} handleInsetNode={handleInsetNode} />
            })
          }
        </div>
      </div>
    )
  } else {
    return <div className='file'>📝{folderData.name}</div>
  }
}

export default Folder