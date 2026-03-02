import './NestedCheckbox.css'

function NestedCheckbox({ data }) {
    return (
        <div className='checkbox_container'>
            {
                data?.map((node, key) => {
                    return (
                        <div style={{ paddingLeft: 30 }} key={key}>
                            <input name={node.name} type='checkbox' value={node.name} />
                            <label>{node.name}</label>
                            {node?.children && <NestedCheckbox data={node?.children} />}
                        </div>
                    )
                })
            }
        </div>
    )

}

export default NestedCheckbox