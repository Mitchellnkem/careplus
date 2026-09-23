
'use client'

import React from "react";

import {
	FormControl,
  FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input";
import {
  type Control,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";


export enum FormFieldType {
	INPUT = "input",
	TEXTAREA = "textarea",
	PHONE_INPUT = "phone_input",
	SELECT = "select",
	CHECKBOX = "checkbox",
	DATE_PICKER = "date_picker",
	SKELETON = "skeleton",
}

const toDateInputValue = (value: unknown, includeTime: boolean) => {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) return "";

  return new Date(value.getTime() - value.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, includeTime ? 16 : 10);
};

interface CustomProps<
  T extends FieldValues = FieldValues,
  TTransformedValues extends FieldValues | undefined = undefined,
> {
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  iconAlt?: string;
  iconSrc?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (
    field: ControllerRenderProps<T, FieldPath<T>>
  ) => React.ReactNode;
  control: Control<T, unknown, TTransformedValues>;
  fieldType: FormFieldType;
}


const RenderInput = <
  T extends FieldValues,
  TTransformedValues extends FieldValues | undefined = undefined,
>({ field, props }: {
  field: ControllerRenderProps<T, FieldPath<T>>;
  props: CustomProps<T, TTransformedValues>;
}) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-550 bg-dark-450">
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              height={24}
              width={24}
              alt={props.iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              autoComplete={props.autoComplete}
              inputMode={props.inputMode}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            className="shad-textArea"
            disabled={props.disabled}
          />
        </FormControl>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <Input
            type="tel"
            placeholder={props.placeholder}
            autoComplete={props.autoComplete ?? "tel"}
            inputMode="tel"
            maxLength={16}
            pattern="^\+[1-9]\d{6,14}$"
            value={String(field.value ?? "")}
            onChange={(event) => {
              const rawValue = event.target.value;
              const digits = rawValue.replace(/\D/g, "").slice(0, 15);
              field.onChange(rawValue.trimStart().startsWith("+") ? `+${digits}` : digits);
            }}
            className="input-phone"
          />
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="user"
            className="ml-2"
          />
          <FormControl>
            <Input
              type={props.showTimeSelect ? "datetime-local" : "date"}
              value={toDateInputValue(
                field.value,
                props.showTimeSelect ?? false
              )}
              onChange={(event) => field.onChange(new Date(event.target.value))}
              className="date-picker border-0 bg-dark-400 text-white"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    default:
      return null;
  }
};


const CustomFormField = <
  T extends FieldValues = FieldValues,
  TTransformedValues extends FieldValues | undefined = undefined,
>(props: CustomProps<T, TTransformedValues>) => {
  const { control, name, label } = props;
  return (
    <FormField<T, FieldPath<T>, TTransformedValues>
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderInput field={field} props={props} />
          {props.description && (
            <FormDescription className="text-xs text-dark-600">
              {props.description}
            </FormDescription>
          )}
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  )
}

export default CustomFormField
