import { FIELD_MANIFEST, LIST_OF_CITIES, LIST_OF_POB, LIST_OF_PROVINCES } from "src/Utils/Constants";
import { SelectField, TextInputField } from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import { getCitiesByProvince } from "src/Utils/Helpers";

export const FormBuilder = ({ field, control, errors, watch, options }) => {
    const FIELD_MANIFEST_TYPE = field?.field_manifest;

    switch (FIELD_MANIFEST_TYPE) {
        case FIELD_MANIFEST.TEXTBOX:
            return (
                <>
                    <TextInputField
                        name={field?.kuid}
                        control={control}
                        label={field?.label}
                        input_type="text"
                    />
                    {errors[field?.kuid]?.message && (
                        <ValidationError message={errors[field?.kuid]?.message} />
                    )}
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
                    {errors[field?.kuid]?.message && (
                        <ValidationError message={errors[field?.kuid]?.message} />
                    )}
                </>
            );
        case FIELD_MANIFEST.LOV_POB:
            return (
                <>
                    <SelectField
                        name={field?.kuid}
                        control={control}
                        label={field?.label}
                        options={LIST_OF_POB}
                    />
                    {errors[field?.kuid]?.message && (
                        <ValidationError message={errors[field?.kuid]?.message} />
                    )}
                </>
            );
        case FIELD_MANIFEST.LOV_PROVINCE:
            return (
                <>
                    <SelectField
                        name={field?.kuid}
                        control={control}
                        label={field?.label}
                        options={LIST_OF_PROVINCES}
                    />
                    {errors[field?.kuid]?.message && (
                        <ValidationError message={errors[field?.kuid]?.message} />
                    )}
                </>
            );
        case FIELD_MANIFEST.LOV_CITY:
            return (
                <>
                    <SelectField
                        name={field?.kuid}
                        control={control}
                        label={field?.label}
                        disabled={!watch('KEY_PROVINCE')}
                        options={watch('KEY_PROVINCE') ? getCitiesByProvince(LIST_OF_CITIES, watch('KEY_PROVINCE')) : []}
                    />
                    {errors[field?.kuid]?.message && (
                        <ValidationError message={errors[field?.kuid]?.message} />
                    )}
                </>
            );
        default:
            console.warn("Unsupported field type:", FIELD_MANIFEST_TYPE);
            return null;
    }
};