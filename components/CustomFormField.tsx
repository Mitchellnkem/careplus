
// import { FormDescription, FormField } from './ui/form'
'use client'

import{
	FormControl,
	FormField,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"

interface CustomProps {
	control: Control<any>,
	fieldType: FormFieldType
}

const CustomFormField = ({ control, fieldType, name }: CustomProps) => {
  return (
	<FormField 
		control={control}
		name={name}
		render={({field}) => (
			<FormItem>
				control={control}
				{fieldType !== FormFieldType.CHECKBOX && label (
					<FormLabel>{label}</FormLabel> 
				)}
			</FormItem>
		)}
	/>
  )
}

export default CustomFormField
