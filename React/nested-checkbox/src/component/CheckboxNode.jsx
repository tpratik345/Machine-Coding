import { useEffect, useRef } from "react"
import NestedCheckbox from "./NestedCheckbox"

function CheckboxNode({ node, checked, handleOnChange, setChecked }) {
    const ref = useRef(null);

    const allChecked = node?.children?.length > 0 && node.children.every((node) => checked[node.id])

    const someChecked = node?.children?.length > 0 && node.children.some((node) => checked[node.id])

    useEffect(() => {
        if (ref.current) {
            // console.log(ref.current, allChecked, someChecked, checked)
            ref.current.indeterminate = !allChecked && someChecked;
        }
    }, [checked]);

    return (
        <div style={{ paddingLeft: 30 }} key={node.id}>
            <input
                ref={ref}
                name={node.name}
                type='checkbox'
                checked={checked?.[node?.id] || false}
                onChange={(e) => handleOnChange(e, node)} />
            <label>{node.name}</label>
            {node?.children && <NestedCheckbox data={node?.children} checked={checked} setChecked={setChecked} />}
        </div>
    )
}

export default CheckboxNode