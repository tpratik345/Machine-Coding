import { useState } from 'react'
import './Folder.css'

function Folder({ folderData }) {
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

  function onAddFolder(e) {
    if (e.key === 'Enter' && e.target.value) {
      setShowInput({ ...showInput, visible: false })
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
                onKeyDown={onAddFolder}
              />
            </div>
          }
          {
            folderData.items.map((item) => {
              // if (item.isFolder) {
              return <Folder key={item.id} folderData={item} />
              // } 
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