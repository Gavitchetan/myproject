import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'


interface customprops {
    label: string,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    id: string,
    disabled: boolean,
    required: boolean

}
const CustomCheckbox: React.FC<customprops> = ({ id, register, errors, disabled, label, required }) => {
    return (
        <div className=' flex flex-row gap-3'>
            <span className=' font-bold'> {label}</span>
            <input  {...register?.(id, { required })} type="checkbox" id={id} />
        </div>
    )
}

export default CustomCheckbox