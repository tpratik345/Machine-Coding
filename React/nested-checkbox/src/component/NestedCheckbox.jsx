import { useState } from 'react';
import './NestedCheckbox.css'

function NestedCheckbox({ data, checked, setChecked }) {

    function handleOnChange(e, node) {
        const isChecked = e.target.checked;

        setChecked((prev) => {
            const newState = { ...prev, [node.id]: isChecked };

            // const children = node.children;
            // if (children?.length) {
            //     children.map((child) => {
            //         newState = { ...prev, [child.id]: isChecked }

            //     })
            // }

            const updatedChildren = (node) => {
                node?.children?.length && node?.children.forEach((child) => {
                    newState[child.id] = isChecked
                    if(node?.children?.length) {
                        updatedChildren(child)
                    }
                })
            }
            updatedChildren(node);

            return newState;
        })


    }

    return (
        <div className='checkbox_container'>
            {
                data?.map((node) => {
                    return (
                        <div style={{ paddingLeft: 30 }} key={node.id}>
                            <input
                                name={node.name}
                                type='checkbox'
                                checked={checked?.[node?.id] || false}
                                onChange={(e) => handleOnChange(e, node)} />
                            <label>{node.name}</label>
                            {node?.children && <NestedCheckbox data={node?.children} checked={checked} setChecked={setChecked} />}
                        </div>
                    )
                })
            }
        </div>
    )

}

export default NestedCheckbox