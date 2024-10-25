import {
  Autocomplete,
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  Switch,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Controller, useController } from "react-hook-form";
import { NumericFormat, PatternFormat } from "react-number-format";
import { useDispatch } from "react-redux";
import { showErrorModal } from "src/Redux/Reducers/ErrorState";
import { defaultGetOptionLabel, validateFileSize } from "src/Utils/Helpers";
import UploadIcon from "src/assets/svgs/uploadIcon.svg";
import Tick from "src/assets/svgs/tick_white.svg";

const PatternFormatRef = React.forwardRef((props, ref) => (
  <PatternFormat {...props} getInputRef={ref} />
));

// TEXT FIELD
export const TextInputField = ({
  name,
  label,
  control,
  placeholder = "",
  maxLength,
  input_type,
  type = "text",
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <TextField
            {...field}
            id={name}
            name={name}
            label={label}
            type={type}
            variant="filled"
            onKeyDown={(event) => {
              if (type === "text") {
                const keyCode = event.keyCode || event.which;
                const keyValue = String.fromCharCode(keyCode);
                // Allow backspace key, enter key, and tab key
                if (
                  event.keyCode === 8 ||
                  event.keyCode === 13 ||
                  event.keyCode === 9
                )
                  return;
                if (!/^[a-zA-Z ]*$/.test(keyValue)) event.preventDefault();
              }
            }}
            fullWidth
            placeholder={input_type === "date" ? "" : placeholder}
            InputProps={{
              disableUnderline: true, // Remove underline like in NicInput
              sx: {
                border: "2px solid silver",
                borderRadius: "7px",
                fontSize: "1.25rem",
                height: "70px",
                backgroundColor: "white", // Make sure it's white
                "&:hover": {
                  backgroundColor: "white",
                },
                "&.Mui-focused": {
                  backgroundColor: "white", // Maintain white on focus
                },
              },
            }}
            InputLabelProps={{
              sx: {
                fontSize: "1.25rem",
                color: "#666666",
                marginTop: "5px",
              },
            }}
            sx={{
              maxWidth: "500px",
              width: "100%",
              "& .MuiFilledInput-root": {
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "white", // Keep white on hover
                },
                "&.Mui-focused": {
                  backgroundColor: "white", // Keep white on focus
                },
              },
            }}
          />
        );
      }}
    />
  );
};

// ALPHA NUMERIC FIELD
export const AlphaNumericInputField = ({
  name,
  label,
  control,
  placeholder = "",
  maxLength,
  input_type,
  type = "text",
  hyphonAllowed,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <TextField
            {...field}
            id={name}
            name={name}
            label={label}
            type={type}
            variant="filled"
            onKeyDown={(event) => {
              if (type === "text") {
                const keyValue = event.key;
                const Validation = hyphonAllowed
                  ? /^[a-zA-Z0-9-]*$/
                  : /^[a-zA-Z0-9]*$/;
                // Allow backspace key, enter key, and tab key
                if (
                  event.keyCode === 8 ||
                  event.keyCode === 13 ||
                  event.keyCode === 9
                )
                  return;
                if (!Validation.test(keyValue)) event.preventDefault();
              }
            }}
            sx={{
              "& .MuiFilledInput-root": {
                backgroundColor: "white",
              },
              "& .MuiTextField-root": {
                backgroundColor: "white",
              },
            }}
            fullWidth
            placeholder={input_type === "date" ? "" : placeholder}
            InputProps={{
              disableUnderline: true,
              style: {
                background: "white",
                border: "1px solid #eaeaea",
                borderRadius: "3px",
                maxWidth: "500px",
                width: "100%",
                fontSize: "1.25rem",
                lineHeight: "15px",
                height: "70px",
              },
              inputProps: {
                type: type,
                maxLength: maxLength,
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: "1.25rem",
                color: "#666666",
                marginTop: "5px",
                fontFamily: "ArticulatCF-Regular",
              },
            }}
          />
        );
      }}
    />
  );
};

// TextArea Field
export const MultiLineTextInputField = ({
  name,
  label,
  control,
  placeholder,
  maxLength,
  rows,
}) => (
  <Controller
    name={name}
    control={control}
    shouldUnregister={false}
    render={({ field }) => (
      <TextField
        {...field}
        id={name}
        name={name}
        label={label}
        variant="filled"
        fullWidth
        multiline
        rows={rows}
        placeholder={placeholder}
        InputProps={{
          disableUnderline: true,
          style: {
            background: "white",
            border: "1px solid #eaeaea",
            borderRadius: "3px",
            maxWidth: "500px",
            width: "100%",
            fontSize: "1.25rem",
            lineHeight: "15px",
            marginTop: "10px",
          },
          inputProps: {
            maxLength: maxLength,
            style: {
              paddingBottom: "5px",
            },
          },
        }}
        InputLabelProps={{
          style: {
            fontSize: "1.25rem",
            color: "#666666",
            marginTop: "5px",
            fontFamily: "ArticulatCF-Regular",
          },
        }}
      />
    )}
  />
);

//Toggle Button
export const SwitchButton = ({ name, control, label, checked, onChange }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Switch
              {...field}
              checked={checked}
              onChange={onChange}
              inputProps={{ "aria-label": label }}
            />
          }
          label={label}
        />
      )}
    />
  );
};

// PATTERN INPUT FIELD
export const CustomInputField = ({
  name,
  control,
  label,
  format,
  placeholder,
  inputMode,
  autoFocus = false,
}) => {
  const isMobileNumberFormat = format === "####-#######";

  const materialUITextFieldProps = ({ label, placeholder }) => {
    return {
      id: "standard-basic",
      label: label,
      variant: "filled",
      placeholder: placeholder,
      fullWidth: true,
      InputProps: {
        disableUnderline: true,
        sx: {
          border: "1px solid silver", // Correctly apply the border here
          borderRadius: "7px",
          fontSize: "1.25rem",
          height: "70px",
          backgroundColor: "white", // Background color applied to input
          "&:hover": {
            backgroundColor: "white", // Keep white on hover
          },
          "&.Mui-focused": {
            backgroundColor: "white", // Keep white on focus
          },
        },
      },
      InputLabelProps: {
        sx: {
          fontSize: "1.25rem",
          color: "#666666",
          marginTop: "5px",
        },
      },
      sx: {
        maxWidth: "500px",
        width: "100%", // Set width for the wrapper element
        "& .MuiFilledInput-root": {
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "white", // Keep white on hover
          },
          "&.Mui-focused": {
            backgroundColor: "white", // Keep white on focus
          },
        },
      },
    };
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <PatternFormatRef
          {...field}
          format={format ? format : ""}
          mask="_"
          inputMode={inputMode}
          placeholder={placeholder}
          autoFocus={autoFocus}
          isAllowed={
            isMobileNumberFormat
              ? (values) => {
                  const { value } = values;
                  if (value[0] === undefined) {
                    return true;
                  }
                  if (value[0] !== "0") {
                    return false;
                  }
                  if (value[1] !== undefined) {
                    if (value[1] !== "3") {
                      return false;
                    }
                  }
                  return true; // Disallow input in all other cases
                }
              : undefined
          }
          customInput={TextField}
          {...materialUITextFieldProps({ label, placeholder })}
        />
      )}
    />
  );
};

// NUMBER FIELDS
export const NumberInputField = ({
  name,
  control,
  label,
  format,
  placeholder,
  inputMode,
  autoFocus = false,
  maxLength,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const handleChange = (event) => {
          // Ensure only numbers are entered
          const value = event.target.value.replace(/\D/g, "");
          field.onChange(value);
        };

        const handleKeyDown = (event) => {
          // Allow backspace key
          if (
            event.keyCode === 8 ||
            event.keyCode === 13 ||
            event.keyCode === 9
          )
            return;
          // Prevent non-numeric key presses
          if (!/\d/.test(event.key)) event.preventDefault();
        };
        return (
          <TextField
            {...field}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            id={name}
            name={name}
            label={label}
            type={"text"}
            variant="filled"
            inputMode="numeric"
            inputProps={{ inputMode: "numeric" }}
            sx={{
              "& .MuiFilledInput-root": {
                backgroundColor: "white",
              },
              "& .MuiTextField-root": {
                backgroundColor: "white",
              },
            }}
            fullWidth
            placeholder={placeholder}
            InputProps={{
              disableUnderline: true,
              style: {
                background: "white",
                border: "1px solid #eaeaea",
                borderRadius: "3px",
                maxWidth: "500px",
                width: "100%",
                fontSize: "1.25rem",
                lineHeight: "15px",
                height: "70px",
              },
              inputProps: {
                maxLength: maxLength,
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: "1.25rem",
                color: "#666666",
                marginTop: "5px",
                fontFamily: "ArticulatCF-Regular",
              },
            }}
          />
        );
      }}
    />
  );
};

//Date Field
export const DateInputField = ({ name, label, control, maxDate }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                {...field}
                variant="filled"
                value={field.value ? dayjs(field.value) : null}
                maxDate={maxDate ? dayjs() : undefined}
                slotProps={{
                  textField: {
                    variant: "filled",
                    error: false,
                    InputProps: {
                      disableUnderline: true,
                      style: {
                        backgroundColor: "white",
                      },
                    },
                    style: { backgroundColor: "white" },
                  },
                }}
                label={label}
                sx={{
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "1px",
                  maxWidth: "500px",
                  width: "100%",
                  fontSize: "1.25rem",
                  lineHeight: "15px",
                  height: "70px",
                  "& .MuiIconButton-root": {
                    // Target the icon button inside the DateRangePicker
                    backgroundColor: "white", // Set background color to white
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "1.25rem", //Change the label font
                  },
                  input: {
                    backgroundColor: "white",
                    marginTop: "5px",
                    fontSize: "1.20rem",
                  },
                  svg: { marginTop: "10px" },
                }}
                onChange={(newValue) => {
                  const date = dayjs(newValue).toDate();
                  if (date instanceof Date && !isNaN(date)) {
                    field.onChange(date);
                  } else {
                    // Show an error message or set the date to a default value
                    field.onChange(new Date());
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="standard-basic"
                    type="text"
                    variant="filled"
                    placeholder="Select Date"
                    InputLabelProps={{
                      style: {
                        fontSize: "1.25rem",
                        color: "#666666",
                        marginTop: "5px",
                        fontFamily: "ArticulatCF-Regular",
                      },
                    }}
                    error={false}
                  />
                )}
              />
            </DemoContainer>
          </LocalizationProvider>
        );
      }}
    />
  );
};

// SELECT FIELD
export const SelectField = ({
  name,
  label,
  control,
  placeholder,
  options,
  disabled,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          id="standard-select"
          select
          label={label}
          variant="filled"
          fullWidth
          disabled={disabled}
          placeholder={placeholder}
          sx={{
            "& .MuiFilledInput-root": {
              background: "white",
            },
            "& .MuiSelect-select.MuiInputBase-input.MuiFilledInput-input:focus":
              {
                backgroundColor: "white",
              },
          }}
          InputProps={{
            disableUnderline: true,
            sx: {
              border: "1px solid silver", // Correctly apply the border here
              borderRadius: "7px",
              fontSize: "1.25rem",
              height: "70px",
              maxWidth:"500px",
              width: "100%",
              backgroundColor: "white", // Background color applied to input
              "&:hover": {
                backgroundColor: "white", // Keep white on hover
              },
              "&.Mui-focused": {
                backgroundColor: "white", // Keep white on focus
              },
            },
          }}
          InputLabelProps={{
            sx: {
              fontSize: "1.25rem",
              color: "#666666",
              marginTop: "10px",
              top: "-5px",
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={`${option.value}*${option.label}`}
            >
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

//SelectField With Search
export const AutoCompleteField = ({
  name,
  control,
  placeholder,
  label,
  options,
  defaultValue,
  disabled = false,
  getOptionLabel = defaultGetOptionLabel,
}) => {
  const defaultProps = {
    options: options,
    getOptionLabel: getOptionLabel,
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        // Set field value to null if it's an empty string
        const value = field.value == [] ? null : field.value;
        return (
          <Autocomplete
            {...field}
            {...defaultProps}
            id={name}
            disabled={disabled}
            defaultValue={defaultValue}
            multiple={false}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            onChange={(event, selectedValue) => {
              if (selectedValue) {
                if (name === "e__NBPBranchCode") {
                  const formattedValue =
                    name === "e__NBPBranchCode"
                      ? `${selectedValue.value}*${selectedValue.label} (${selectedValue.value})`
                      : `${selectedValue.value}*${selectedValue.label}`;
                  field.onChange(formattedValue);
                } else {
                  field.onChange(
                    `${selectedValue.value}*${selectedValue.label}`
                  );
                }
              }
            }}
            clearIcon={null}
            sx={{
              background: "white",
              border: "1px solid #eaeaea",
              borderRadius: "3px",
              maxWidth: "500px",
              width: "100%",
              fontSize: "1.25rem",
              lineHeight: "15px",
              height: "70px",
            }}
            value={value}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ background: "white" }}
                placeholder={placeholder}
                label={label}
                variant="filled"
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true,
                  style: {
                    background: "white",
                    border: "1px solid #eaeaea",
                    borderRadius: "3px",
                    maxWidth: "500px",
                    width: "100%",
                    fontSize: "1.25rem",
                    lineHeight: "15px",
                    height: "70px",
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontSize: "1.25rem",
                    color: "#666666",
                    // marginTop: '5px',
                    fontFamily: "ArticulatCF-Regular",
                  },
                }}
              />
            )}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <span
                  style={{
                    marginLeft: "4px",
                    letterSpacing: "0.2px",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    fontSize: "14px",
                  }}
                >
                  {name === "e__NBPBranchCode"
                    ? `${option?.label} (${option?.value})`
                    : option?.label}
                </span>
              </li>
            )}
          />
        );
      }}
    />
  );
};

//MultiSelect Field
export const MultiSelect = ({
  name,
  control,
  options,
  placeholder,
  defaultValue,
  label,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || []}
      render={({ field }) => (
        <>
          <FormControl
            variant="filled"
            sx={{
              maxWidth: "500px",
              width: "100%",
            }}
          >
            <InputLabel
              sx={{
                fontSize: "1.25rem",
                color: "#666666",
                marginTop: "10px",
                fontFamily: "ArticulatCF-Regular",
                top: "-7px",
              }}
              id="multiselect-label"
            >
              {placeholder}
            </InputLabel>
            <Select
              labelId="multiselect-label"
              id={`custom-multi-select`}
              displayEmpty
              multiple
              variant="filled"
              disableUnderline
              MenuProps={{
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                PaperProps: {
                  style: {
                    maxHeight: "280px",
                  },
                },
              }}
              value={field.value || []}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
              renderValue={(selected) => {
                if (
                  selected?.length === 0 ||
                  (selected?.length === 1 && selected[0] === "")
                ) {
                  // return <em style={{ fontFamily: "ArticulatCF-Regular", fontSize: '1.25rem', color: '#666666', fontStyle: 'normal' }}>{placeholder}</em>
                } else {
                  if (selected[0] === "") {
                    let formatArray = selected.slice(1, selected.length);
                    return formatArray
                      .map((item) => item.split("*")[1])
                      .join(", ");
                  } else {
                    return selected
                      ?.map((item) => item.split("*")[1])
                      .join(", ");
                  }
                }
              }}
              style={{
                background: "white",
                border: "1px solid #eaeaea",
                borderRadius: "3px",
                maxWidth: "500px",
                width: "100%",
                fontSize: "1.25rem",
                lineHeight: "15px",
                height: "70px",
                paddingTop: "11px",
              }}
              sx={{
                "& .MuiSelect-select.MuiInputBase-input.MuiFilledInput-input:focus":
                  {
                    backgroundColor: "white",
                  },
                "& .MuiSelect-select.MuiInputBase-input.MuiFilledInput-input": {
                  whiteSpace: name === "e__ModeofTrx" ? "normal" : "nowrap",
                },
              }}
            >
              {/* Options */}
              {options.map((option) => (
                <MenuItem
                  sx={{ height: "45px" }}
                  key={option.value}
                  value={`${option.value}*${option.label}`}
                >
                  <Checkbox
                    checked={
                      defaultValue
                        ? field.value.indexOf(
                            `${option.value}*${option.label}`
                          ) > -1 ||
                          defaultValue.indexOf(
                            `${option.value}*${option.label}`
                          ) > -1
                        : field.value.indexOf(
                            `${option.value}*${option.label}`
                          ) > -1
                    }
                  />
                  <ListItemText primary={option.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
    />
  );
};

// Upload Image
export const UploadImage = ({
  name,
  control,
  label,
  subLabel,
  setValue,
  accept = "image/*",
  id,
}) => {
  const dispatch = useDispatch();

  const mainContainer = {
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    minHeight: "212px",
    height: "auto",
    maxWidth: "480px",
    padding: "20px",
    marginBottom: "20px",
    cursor: "pointer",
  };
  const previewImgStyle = {
    padding: "10px",
    background: "#ccebdc",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    margin: "0 0 10px",
    cursor: "pointer",
  };
  const imgStyle = {
    display: "block",
    margin: "auto",
    marginTop: "6px",
  };
  const handleFileChange = (e, name) => {
    const file = e.target.files[0];
    // Check if file size is greater than 2MB
    if (!validateFileSize(file)) {
      dispatch(
        showErrorModal({
          errorCode: "File Size Exceeded",
          errorMessage: "Please upload a file smaller than 2MB.",
          isError: true,
        })
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUri = reader.result; // Data URI format
      setValue(name, dataUri, { shouldValidate: true }); // Set data URI to form value with the correct name
    };
    reader.readAsDataURL(file); // Read file as data URL
  };

  const handleInputChange = (e, name) => {
    handleFileChange(e, name);
  };
  const mainContainerUPLOADED = {
    maxWidth: "480px",
    minHeight: "312px",
    height: "auto",
    backgroundColor: "#ccebdc",
    padding: "0 0 14px 0",
    borderRadius: "8px",
    boxShadow: "none",
    position: "relative",
  };
  const imageContainer = {
    width: "100%",
    height: "180px",
    overflow: "hidden",
    borderTopLeftRadius: "0.4rem",
    borderTopRightRadius: "0.4rem",
    background: "#ccebdc",
    marginBottom: "10px",
  };
  const changeButtonStyles = {
    position: "absolute",
    boxShadow: "0px 0px 10px 1px rgba(0, 0, 0, 0.1)",
    top: "20px",
    right: "20px",
    backgroundColor: "white",
    color: "black",
    fontSize: "16px",
    padding: "12px 24px",
    border: "none",
    cursor: "pointer",
    borderRadius: "20px",
    textAlign: "center",
    fontWeight: "500",
  };
  const tickContainer = {
    background: "#66c297",
    borderRadius: "50%",
    margin: "10px 10px 10px 26px",
    width: "60px",
    height: "60px",
    display: "inline-block",
    verticalAlign: "middle",
  };
  const tickStyles = {
    paddingTop: "19px",
    display: "block",
    margin: "auto",
  };

  const labelStyles = {
    fontFamily: "ArticulatCF-Bold",
    fontSize: "20px",
    margin: "0 0 0 26px",
  };
  const subLabelStyles = {
    fontFamily: "ArticulatCF-Regular",
    fontSize: "16px",
    margin: "0 0 0 26px",
    marginTop: "16px",
    marginRight: "25px",
  };

  return (
    <Controller
      id={id}
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <Box>
          {field.value ? (
            <Box sx={mainContainerUPLOADED}>
              <Box sx={imageContainer}>
                <img
                  src={field.value}
                  style={{ objectFit: "cover" }}
                  alt="Uploaded"
                  height={"100%"}
                  width={"100%"}
                />
              </Box>
              <label htmlFor={name}>
                <Box sx={changeButtonStyles}>Change</Box>
                <input
                  id={name}
                  type="file"
                  style={{ display: "none" }}
                  accept={accept}
                  onChange={(e) => handleInputChange(e, name)}
                />
              </label>
              <Box sx={tickContainer}>
                <img src={Tick} style={tickStyles} />
              </Box>
              <Box sx={labelStyles}>{label}</Box>
              {!!subLabel && <Box sx={subLabelStyles}>{subLabel}</Box>}
            </Box>
          ) : (
            <label htmlFor="file-input">
              <Box sx={mainContainer}>
                <Box sx={previewImgStyle}>
                  <img style={imgStyle} src={UploadIcon} />
                </Box>
                <input
                  id="file-input"
                  type="file"
                  style={{ display: "none" }}
                  accept={accept}
                  onChange={(e) => handleFileChange(e, name)}
                />
                <Box sx={{ fontFamily: "ArticulatCF-Bold", fontSize: "20px" }}>
                  {label}
                </Box>
                {!!subLabel && (
                  <Box
                    sx={{
                      fontFamily: "ArticulatCF-Regular",
                      fontSize: "18px",
                      marginTop: "16px",
                      marginRight: "15px",
                    }}
                  >
                    {subLabel}
                  </Box>
                )}
              </Box>
            </label>
          )}
        </Box>
      )}
    />
  );
};

//Checkbox Component
export const CheckboxField = ({ name, control, label }) => {
  const styles = {
    "& .MuiSvgIcon-root": {
      fontSize: "clamp(18px, 26px, 26px)",
      marginRight: "0",
    },
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox id={name} checked={field.value} {...field} sx={styles} />
          }
          label={label}
        />
      )}
    />
  );
};

// RECAPTCHA FIELD
export const CaptchaField = ({ name, control, onChange, siteKey, style }) => {
  //using a hidden input field to fix the elm.focus issue of
  const {
    field: { ref, ...field },
  } = useController({
    name,
    control,
    rules: { required: true },
  });
  return (
    <div>
      <input ref={ref} type="hidden" />
      <ReCAPTCHA
        {...field}
        sitekey={siteKey}
        style={style}
        onChange={(value) => {
          field.onChange(value);
          if (onChange) onChange(value);
        }}
      />
    </div>
  );
};

//Currency Field
export const CurrencyInputField = ({
  name,
  control,
  label,
  placeholder,
  thousandSeparator,
}) => {
  const materialUITextFieldProps = ({ label, placeholder }) => {
    return {
      id: "standard-basic",
      label: label,
      variant: "filled",
      placeholder: placeholder,
      fullWidth: true,
      InputProps: {
        disableUnderline: true,
        style: {
          background: "white",
          border: "1px solid #eaeaea",
          borderRadius: "3px",
          maxWidth: "500px",
          width: "100%",
          fontSize: "1.25rem",
          lineHeight: "15px",
          height: "70px",
        },
      },
      InputLabelProps: {
        style: {
          fontSize: "1.25rem",
          color: "#666666",
          marginTop: "5px",
          fontFamily: "ArticulatCF-Regular",
        },
      },
    };
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <NumericFormat
          {...field}
          allowLeadingZeros
          thousandSeparator=","
          allowNegative={false}
          customInput={TextField}
          onValueChange={(values) => {
            field.onChange(values.value);
          }}
          {...materialUITextFieldProps({ label, placeholder })}
        />
      )}
    />
  );
};
