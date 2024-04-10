"use client";
import React, { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import styles from "./verify.module.css";
import { useRouter } from "next/navigation";

const page = () => {
  const [email, setEmail] = useState("");
  const [isResetTimer, setTimer] = useState(false);
  const [time, setTime] = useState("03:00");
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const otpRef = useRef();
  const errRef = useRef();

  const handleTimer = () => {
    var [min, sec] = time.split(":");
    var timer = setInterval(() => {
      if (sec === "00" && timer) {
        let temp = parseInt(min) - 1;
        min = "0" + temp.toString();
        sec = "59";
      } else {
        let temp2 = (parseInt(sec) - 1).toString();
        if (temp2.length < 2) {
          temp2 = "0" + temp2;
        }
        sec = temp2;
      }
      setTime(`${min}:${sec}`);
      if (sec === "00" && min === "00") {
        setTimer(true);
        setTime("03:00");
        clearInterval(timer);
      }
    }, 1000);
  };

  const sendMail = async (id: string) => {
    try {
      var res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/profile/verify`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ mail: id }),
        }
      );
      res = await res.json();
      setOtp(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  var timeRef = useRef(true);
  useEffect(() => {
    if (timeRef.current) {
      handleTimer();
      if (sessionStorage.getItem("userDetails")) {
        var mail = JSON.parse(sessionStorage.getItem("userDetails"))["uid"];
        setEmail(mail);
      }
      sendMail(mail);
    }
    return () => {
      timeRef.current = false;
    };
  }, []);

  const handleMail = () => {
    setTimer(false);
    setTime("03:00");
    handleTimer();
    sendMail(email);
  };

  const handleSubmit = (eve: BaseSyntheticEvent) => {
    var { value } = otpRef.current;
    console.log(value, otp);
    if (value === otp) {
      router.push("/security");
    } else {
      errRef.current.style.display = "flex";
      return;
    }
  };

  return (
    <div id={styles.otpVerify}>
      <h1>Email Verification</h1>
      <p>
        An otp has been sent to your mail id
        <span style={{ color: "blue" }}>{email}</span>
      </p>
      <label htmlFor="otp">Enter the code:</label>
      <input type="text" name="otp" ref={otpRef} />
      <div className={styles.error} ref={errRef}>
        Please enter a valid otp
      </div>
      <div id={styles.control}>
        <div
          id={styles.timer}
          className={isResetTimer ? `${styles.disable}` : ""}
        >
          {time}
        </div>
        <input type="submit" value="Verify otp" onClick={handleSubmit} />
        <p
          className={isResetTimer ? "" : `${styles.disable}`}
          onClick={handleMail}
        >
          Resend otp?
        </p>
      </div>
    </div>
  );
};

export default page;
