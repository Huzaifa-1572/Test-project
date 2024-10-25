import React from "react";
import useTimer from "src/Hooks/useTimer";

const timerbtnstyles = {
  borderRadius: "5px",
  cursor: "pointer",
  lineHeight: "10px",
  backgroundColor: "white",
  border: "1px solid green",
  padding: "1em 1em",
  color: "#37a862",
  fontWeight: "bold",
};

const timerdivstyles = {
  color: "#37a862",
  fontWeight: "bold",
  paddingLeft: "0.7em",
};
const Timer = ({ resendOtp }) => {
  const [minutes, seconds, setMinutes, setSeconds] = useTimer();

  return (
    <>
      {minutes === 0 && seconds === 0 && (
        <button
          type="button"
          className="btn"
          style={timerbtnstyles}
          onClick={() => {
            setMinutes(0);
            setSeconds(59);
            resendOtp();
          }}
        >
          Resend OTP
        </button>
      )}
      <div
        style={{
          backgroundColor: "transparent",
          display: "flex",
          marginTop: "10px",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        {minutes === 0 && seconds === 0 ? null : (
          <>
            Resend in:
            <div style={timerdivstyles}>
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Timer;
