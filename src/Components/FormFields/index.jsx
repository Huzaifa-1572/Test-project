import { Autocomplete, Box, FormControlLabel, Switch } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Controller, useController } from "react-hook-form";
import { LuCheckCheck, LuUpload } from "react-icons/lu";
import { NumericFormat, PatternFormat } from "react-number-format";
import { useDispatch } from "react-redux";
import { showErrorModal } from "src/Redux/Reducers/ErrorState";
import { validateFileSize } from "src/Utils/Helpers";

const PatternFormatRef = React.forwardRef((props, ref) => (
  <PatternFormat {...props} getInputRef={ref} />
));

// TEXT FIELD
export const TextInputField = ({
  name,
  label,
  control,
  placeholder = "",
  input_type,
  type = "text",
  maxLength = 100,
  disabled,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...restField } }) => (
        <TextField
          {...restField}
          id={name}
          name={name}
          label={label}
          type={type}
          disabled={disabled}
          variant="filled"
          value={value}
          onKeyDown={(event) => {
            if (type === "text") {
              const key = event.key;
              if (["Backspace", "Enter", "Tab"].includes(key)) return;
              if (!/^[a-zA-Z ]$/.test(key)) event.preventDefault();
            }
          }}
          onChange={(event) => {
            let newValue = event.target.value;
            if (type === "text") {
              newValue = newValue.replace(/[^A-Za-z ]/g, ""); // Remove numbers dynamically
            }
            onChange(newValue); // Update the field value in the form state
          }}
          fullWidth
          placeholder={input_type === "date" ? "" : placeholder}
          InputProps={{
            disableUnderline: true,
            inputMode: "text", // Ensures a text-based keyboard on mobile
            pattern: "[A-Za-z ]*", // Restricts input to alphabets and spaces only
            sx: {
              border: "1px solid silver",
              borderRadius: "7px",
              fontSize: "1.1rem",
              height: "70px",
              backgroundColor: "white",
              fontWeight: 500,
              "&:hover": { backgroundColor: "white" },
              "&.Mui-focused": { backgroundColor: "white" },
            },
            autoComplete: "off",
            autoCorrect: "off",
            inputProps: { maxLength: maxLength },
          }}
          InputLabelProps={{
            sx: { fontSize: "0.85rem", color: "#666666", marginTop: "5px" },
          }}
          sx={{
            maxWidth: "500px",
            width: "100%",
            "& .MuiFilledInput-root": {
              backgroundColor: "white",
              "&:hover": { backgroundColor: "white" },
              "&.Mui-focused": { backgroundColor: "white" },
            },
          }}
        />
      )}
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
                if (event.keyCode === 8 || event.keyCode === 13 || event.keyCode === 9) return;
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
                fontSize: "1.1rem",
                lineHeight: "15px",
                fontWeight: 500,
                height: "70px",
              },
              inputProps: {
                type: type,
                maxLength: maxLength,
                autoComplete: "off",  // Disable autocomplete
                autoCorrect: "off",   // Disable autocorrect
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: "0.85rem",
                color: "#666666",
                marginTop: "5px",
                fontFamily: "ArticulatCF-Regular",
              },
            }}
          />
        );
      }}
    />
  )
};

// TEXTAREA FIELD
export const MultiLineTextInputField = ({ name, label, control, placeholder, maxLength, rows }) => (
  <Controller
    name={name}
    control={control}
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
        sx={{
          maxWidth: "500px",
          width: "100%",
          fontWeight: 500,
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
        InputProps={{
          disableUnderline: true, // Remove underline like in NicInput
          sx: {
            border: "1px solid silver",
            borderRadius: "7px",
            fontSize: "1.1rem",
            backgroundColor: "white", // Make sure it's white
            "&:hover": {
              backgroundColor: "white",
            },
            "&.Mui-focused": {
              backgroundColor: "white", // Maintain white on focus
            },
          },
          autoComplete: "off", // Disable autocomplete
          autoCorrect: "off", // Disable browser correction (especially for mobile)
        }}
        InputLabelProps={{
          sx: {
            fontSize: "0.85rem",
            color: "#666666",
            marginTop: "5px",
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
  type = 'text',
  name,
  control,
  label,
  format,
  placeholder,
  inputMode,
  autoFocus = false,
  disabled = false
}) => {
  const isMobileNumberFormat = format === "####-#######";

  const materialUITextFieldProps = ({ label, placeholder }) => {
    return {
      id: "standard-basic",
      label: label,
      variant: "filled",
      placeholder: placeholder,
      fullWidth: true,
      autoFocus: autoFocus,
      InputProps: {
        disableUnderline: true,
        sx: {
          border: "1px solid silver",
          borderRadius: "7px",
          fontSize: "1.1rem",
          fontWeight: 500,
          height: "70px",
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "white",
          },
          "&.Mui-focused": {
            backgroundColor: "white",
          },
        },
        inputProps: {
          autoComplete: "off",  // Disable autocomplete
          autoCorrect: "off",   // Disable autocorrect
        },
      },
      InputLabelProps: {
        sx: {
          fontSize: "0.85rem",
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
          type={type}
          format={format ? format : ""}
          mask="_"
          inputMode={inputMode}
          placeholder={placeholder}
          autoFocus={autoFocus}
          disabled={disabled}
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
            inputProps={{
              inputMode: "numeric",
              autoComplete: "off",  // Disable autocomplete
              autoCorrect: "off",   // Disable autocorrect
              maxLength: maxLength,
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
            placeholder={placeholder}
            InputProps={{
              disableUnderline: true,
              style: {
                background: "white",
                border: "1px solid #eaeaea",
                borderRadius: "3px",
                maxWidth: "500px",
                width: "100%",
                fontSize: "1.1rem",
                fontWeight: 500,
                lineHeight: "15px",
                height: "70px",
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: "0.85rem",
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
export const DateInputField = ({ name, label, control, disabled, maxDate }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              sx={{ paddingTop: "0px" }}
              components={["DatePicker"]}
            >
              <DatePicker
                {...field}
                variant="filled"
                value={field.value ? dayjs(field.value) : null}
                maxDate={maxDate ? dayjs() : undefined}
                disabled={disabled}
                slotProps={{
                  textField: {
                    variant: "filled",
                    error: false,
                    InputProps: {
                      disableUnderline: true,
                      style: {
                        border: "1px solid silver",
                        borderRadius: "7px",
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        height: "70px",
                        backgroundColor: disabled ? "#f0f0f0" : "white", // Conditional background color
                        cursor: disabled ? "not-allowed" : "text", // Show not-allowed cursor when disabled
                      },
                    },
                    InputLabelProps: {
                      style: {
                        fontSize: "0.85rem",
                        color: disabled ? "#aaaaaa" : "#666666", // Dim the label color when disabled
                        marginTop: "5px",
                        backgroundColor: "transparent",
                      },
                    },
                  },
                }}
                label={label}
                sx={{
                  backgroundColor: disabled ? "#f0f0f0" : "white", // Conditional background for the picker
                  border: "none",
                  borderRadius: "7px",
                  maxWidth: "500px",
                  width: "100%",
                  fontSize: "1.1rem",
                  height: "70px",
                  fontWeight: 500,
                  "& .MuiIconButton-root": {
                    backgroundColor: disabled ? "#f0f0f0" : "white", // Icon button matches background
                    pointerEvents: disabled ? "none" : "auto", // Disable interactions on the icon button
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "1.1rem",
                    color: disabled ? "#aaaaaa" : "#666666", // Label styling for disabled state
                  },
                  svg: { marginTop: "4px" },
                }}
                onChange={(newValue) => {
                  const date = dayjs(newValue).toDate();
                  if (date instanceof Date && !isNaN(date)) {
                    field.onChange(date);
                  } else {
                    field.onChange(null); // Clear or handle invalid date
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
                        fontSize: "0.85rem",
                        color: disabled ? "#aaaaaa" : "#666666", // Dim the placeholder color when disabled
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
              fontSize: "1.1rem",
              height: "70px",
              maxWidth: "500px",
              fontWeight: 500,
              width: "100%",
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "white",
              },
              "&.Mui-focused": {
                backgroundColor: "white",
              },
            },
          }}
          InputLabelProps={{
            sx: {
              fontSize: "0.85rem",
              color: "#666666",
              marginTop: "10px",
              top: "-5px",
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={`${option.value}`}
            >
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

// SELECT FIELD
export const AutocompleteSelectField = ({ name, label, control, options, disabled }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option.label}
          value={options.find((option) => option.value === value) || null}  // Find the correct option object
          onChange={(event, newValue) => {
            onChange(newValue ? newValue.value : '');  // Pass only the 'value' (string)
          }}
          disableClearable
          disabled={disabled}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="filled"
              fullWidth
              disabled={disabled}
              InputProps={{
                ...params.InputProps,
                disableUnderline: true, // Disable underline
              }}
              sx={{
                '& .MuiFilledInput-root': {
                  backgroundColor: 'white',
                  '&.Mui-focused': {
                    backgroundColor: 'white',
                  },
                  '&.Mui-disabled': {
                    backgroundColor: '#f5f5f5',
                  },
                  '&:hover': {
                    backgroundColor: 'white',
                  },
                },
                '& .MuiInputBase-root': {
                  background: 'white',
                  borderRadius: '7px',
                  border: '1px solid silver',
                  maxWidth: '500px',
                  width: '100%',
                  fontSize: '1.1rem',
                  height: '70px',
                  fontWeight: 500,
                  boxShadow: 'none',
                },
                '& .MuiInputLabel-root': {
                  fontSize: '1.1rem',
                  color: '#666666',
                  marginTop: '10px',
                  fontFamily: `'Roboto', 'Arial', sans-serif`,
                  top: '-5px',
                },
              }}
            />
          )}
        />
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
    borderRadius: "15px",
    backgroundColor: "#EEF6FF",
    minHeight: "250px",
    height: "auto",
    maxWidth: "500px",
    padding: "20px",
    cursor: "pointer",
    border: '2px solid #2C74BB',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  };
  const previewImgStyle = {
    padding: "10px",
    background: "#619de3",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    margin: "0 0 10px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const imgStyle = {
    color: "white",
    fontSize: "26px",
  };
  const handleFileChange = (e, name) => {
    const file = e.target.files[0];
    // Check if file size is greater than 5MB
    if (!validateFileSize(file)) {
      dispatch(
        showErrorModal({
          errorCode: "File Size Exceeded",
          errorMessage: "Please upload a file smaller than 5MB.",
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
    maxWidth: "500px",
    height: "312px",
    backgroundColor: "#f4f4f4",
    padding: "0 0 14px 0",
    borderRadius: "8px",
    boxShadow: "none",
    position: "relative",
    border: '2px solid #407ec9'
  };
  const imageContainer = {
    width: "100%",
    height: "220px",
    overflow: "hidden",
    objectFit: 'cover',
    borderTopLeftRadius: "0.4rem",
    borderTopRightRadius: "0.4rem",
    background: "#619de3",
  };
  const changeButtonStyles = {
    position: "absolute",
    boxShadow: "0px 0px 10px 1px rgba(0, 0, 0, 0.1)",
    top: "20px",
    right: "20px",
    backgroundColor: "white",
    color: "#3B3B3B",
    fontSize: "16px",
    padding: "12px 24px",
    border: "none",
    cursor: "pointer",
    borderRadius: "20px",
    textAlign: "center",
    fontWeight: "500",
  };
  const tickContainer = {
    background: "#b9d3f2",
    borderRadius: "50%",
    margin: "10px 10px 10px 26px",
    width: "60px",
    height: "60px",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'

  };
  const tickStyles = {
    fontSize: '40px',
    color: '#3B3B3B',
  };

  const labelStyles = {
    fontSize: "20px",
    color: '#3B3B3B'
  };
  const subLabelStyles = {
    fontSize: "76px",
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
        <Box sx={{ borderRadius: "8px" }}>
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
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={tickContainer}>
                  <LuCheckCheck style={tickStyles} />
                </Box>
                <Box sx={labelStyles}>{label}</Box>
                {!!subLabel && <Box sx={subLabelStyles}>{subLabel}</Box>}
              </Box>
            </Box>
          ) : (
            <label htmlFor="file-input">
              <Box sx={mainContainer}>
                <Box sx={previewImgStyle}>
                  <LuUpload style={imgStyle} />
                </Box>
                <input
                  id="file-input"
                  type="file"
                  style={{ display: "none" }}
                  accept={accept}
                  onChange={(e) => handleFileChange(e, name)}
                />
                <Box sx={{ fontSize: "20px", color: '#407ec9' }}>
                  {label}
                </Box>
                {!!subLabel && (
                  <Box
                    sx={{
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
    '& .MuiSvgIcon-root': { fontSize: 'clamp(18px, 26px, 26px)', marginRight: '0' }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox
              id={name}
              checked={field.value}
              {...field}
              sx={styles}
            />
          }
          label={label}
          sx={{
            '& .MuiFormControlLabel-label': {
              color: "gray",
              fontSize: 'clamp(12px, 2vw, 18px)',
            },
          }}
        />
      )}
    />
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
          fontSize: "1.1rem",
          lineHeight: "15px",
          height: "70px",
        },
      },
      InputLabelProps: {
        style: {
          fontSize: "0.85rem",
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

// RECAPTCHA FIELD
export const CaptchaField = ({ name, control, onChange, siteKey, style }) => {
  //using a hidden input field to fix the elm.focus issue of
  const { field: { ref, ...field } } = useController({
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
        size="normal"
        onChange={(value) => {
          field.onChange(value);
          if (onChange) onChange(value);
        }}
      />
    </div>
  );
}