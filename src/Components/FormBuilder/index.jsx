import { useMemo } from "react";
import { AutocompleteSelectField, CheckboxField, CustomInputField, DateInputField, MultiLineTextInputField, SelectField, TextInputField, UploadImage } from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import { FIELD_MANIFEST } from "src/Utils/Constants";
import { LIST_OF_CITIES, LIST_OF_POB, LIST_OF_PROVINCES } from "src/Utils/Lovs";

export const FormBuilder = ({ field, control, errors, watch, setValue, getValues, options, disabled }) => {
    const FIELD_MANIFEST_TYPE = field?.field_manifest;
    const PLACE_OF_BIRTH_OPTIONS = useMemo(() => LIST_OF_POB, [])

    switch (FIELD_MANIFEST_TYPE) {
        case FIELD_MANIFEST.TEXTBOX:
            return (
                <>
                    <TextInputField
                        name={field?.kuid}
                        control={control}
                        label={field?.label}
                        input_type="text"
                        disabled={disabled || field?.locked}
                    />
                    {errors[field?.kuid]?.message && (<ValidationError message={errors[field?.kuid]?.message} />)}
                </>
            );

        case FIELD_MANIFEST.TEXTDATE:
            return (
                <>
                    <TextInputField
                        name={field?.kuid}
                        control={control}
                        label={field?.label}
                        input_type="text"
                        disabled={disabled || field?.locked}
                    />
                    {errors[field?.kuid]?.message && (<ValidationError message={errors[field?.kuid]?.message} />)}
                </>
            );

        case FIELD_MANIFEST.MULTILINE_TEXTBOX:
            return (
                <>
                    <MultiLineTextInputField
                        name={field?.kuid}
                        control={control}
                        label={field?.label}
                        rows={3}
                    />
                    {errors[field?.kuid]?.message && (<ValidationError message={errors[field?.kuid]?.message} />)}
                </>
            );

        case FIELD_MANIFEST.DROPDOWN:
            return (
                <>
                    <SelectField
                        name={field?.kuid}
                        control={control}
                        label={field?.label}
                        options={options || []}
                    />
                    {errors[field?.kuid]?.message && (<ValidationError message={errors[field?.kuid]?.message} />)}
                </>
            );
        case FIELD_MANIFEST.LOV_POB:
            return (
                <>
                    <AutocompleteSelectField
                        name={field?.kuid}
                        control={control}
                        label={field?.label}
                        options={PLACE_OF_BIRTH_OPTIONS}
                    />
                    {errors[field?.kuid]?.message && (<ValidationError message={errors[field?.kuid]?.message} />)}
                </>
            );
        case FIELD_MANIFEST.LOV_PROVINCE:
            return (
                <>
                    <AutocompleteSelectField
                        name={field?.kuid}
                        control={control}
                        label={field?.label}
                        options={LIST_OF_PROVINCES}
                    />
                    {errors[field?.kuid]?.message && (<ValidationError message={errors[field?.kuid]?.message} />)}
                </>
            );
        case FIELD_MANIFEST.LOV_CITY:
            return (
                <>
                    <AutocompleteSelectField
                        name={field?.kuid}
                        control={control}
                        label={field?.label}
                        disabled={!watch('KEY_PROVINCE')}
                        options={LIST_OF_CITIES[watch('KEY_PROVINCE')] || []}
                    />
                    {errors[field?.kuid]?.message && (<ValidationError message={errors[field?.kuid]?.message} />)}
                </>
            );
        case FIELD_MANIFEST.UPLOAD_DOCUMENT:
            return (
                <>
                    <UploadImage
                        name={field?.kuid}
                        control={control}
                        label={field?.label}
                        getValues={getValues}
                        setValue={setValue}
                    />
                    {errors[field?.kuid]?.message && (<ValidationError message={errors[field?.kuid]?.message} />)}
                </>
            );
        case FIELD_MANIFEST.CNIC:
            return (
                <>
                    <CustomInputField
                        name={field?.kuid}
                        control={control}
                        format={"#####-#######-#"}
                        label={field?.label}
                        placeholder="xxxxx-xxxxxxx-x"
                        inputMode="numeric"
                        type="tel"
                        disabled={field?.locked}
                    />
                    {errors[field?.kuid]?.message && (<ValidationError message={errors[field?.kuid]?.message} />)}
                </>
            );
        case FIELD_MANIFEST.DATE_PICKER:
            return (
                <>
                    <DateInputField
                        name={field?.kuid}
                        control={control}
                        label={field?.label}
                        disabled={disabled || field?.locked}
                    />
                    {errors[field?.kuid]?.message && (<ValidationError message={errors[field?.kuid]?.message} />)}
                </>
            );
        case FIELD_MANIFEST.CHECKBOX:
            return (
                <>
                    <CheckboxField
                        name={field?.kuid}
                        control={control}
                        label={field?.label}
                    />
                    {errors[field?.kuid]?.message && (<ValidationError message={errors[field?.kuid]?.message} />)}
                </>
            );
        default:
            console.warn("Unsupported field type:", FIELD_MANIFEST_TYPE);
            return null;
    }
};
