import { useState } from 'react';
import './NestedCheckbox.css'
import CheckboxNode from './CheckboxNode';
import { checkBoxData } from '../data/data';

function NestedCheckbox({ data, checked, setChecked }) {

    function handleOnChange(e, node) {
        const isChecked = e.target.checked;

        setChecked((prev) => {
            const newState = { ...prev, [node.id]: isChecked };

            const updatedChildren = (node) => {
                if(!node?.children?.length) return;
                node?.children.forEach((child) => {
                    newState[child.id] = isChecked
                    if (child?.children?.length) {
                        updatedChildren(child)
                    }
                })
            }
            updatedChildren(node);

            const verifyChecked = (node) => {
                if (!node.children) return newState[node.id] || false;

                const allChecked = node.children.every((child) => verifyChecked(child));
                newState[node.id] = allChecked;
                return allChecked
            }
            checkBoxData.forEach((node) => verifyChecked(node));



            return newState;
        })


    }

    return (
        <div className='checkbox_container'>
            {
                data?.map((node) => {
                    return (
                        <CheckboxNode
                            key={node.id}
                            node={node}
                            checked={checked}
                            handleOnChange={handleOnChange}
                            setChecked={setChecked}
                        />
                    )
                })
            }
        </div>
    )

}

export default NestedCheckbox