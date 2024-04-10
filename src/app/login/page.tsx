"use client";
import React, { useRef, useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import configuration from "./configuration.json";
import { Input } from "../../InputControls/Input";
import {
  handleFieldValidation,
  handleFormValidation,
} from "../../AppValidations/appValidation";
import { useRouter } from "next/navigation";
import { Cookie } from "../../common/cookies";
import { appStore } from "../../store/store";

const Login = () => {
  const [inputControl, setInputControl] = useState(configuration);
  const handleChange = (eve: Object) => {
    setInputControl(handleFieldValidation(eve, inputControl));
  };
  const router = useRouter();
  const saveRef = useRef();

  const handleLogin = async () => {
    const [isInvalid, dataObj, inputControlObj] =
      handleFormValidation(inputControl);
    if (isInvalid) {
      setInputControl(inputControlObj);
      return;
    }
    console.log("The data to be sent is");
    console.log(dataObj);
    var res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/profile/login`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(dataObj),
      }
    );
    res = await res.json();
    if (res.status === "failure") {
      document.getElementById("loginError").style.display = "flex";
    } else {
      if (saveRef.current.checked) {
        localStorage.setItem("objectId", res.id);
      } else {
        Cookie.setItem("objectId", res.id);
      }
      appStore.dispatch({ type: "AUTH", payload: true });
      router.push("/");
    }
  };

  const showPassword = (eve: React.BaseSyntheticEvent, name: string) => {
    // eve?.stopPropagation();
    const cname = eve?.target.classList[1];
    const open = document.querySelector(".bi-eye");
    const close = document.querySelector(".bi-eye-slash");
    const inp = document.getElementsByName(name)[0];
    if (cname && open && close) {
      if (cname == "bi-eye") {
        open.style.display = "none";
        close.style.display = "flex";
        setInputControl((obj) => {
          var temp = obj.map((config) => {
            if (config.label == "Password" && config.type !== "password") {
              config.type = "password";
            }
            return config;
          });
          return temp;
        });
      } else {
        close.style.display = "none";
        open.style.display = "flex";
        setInputControl((obj) => {
          var temp = obj.map((config) => {
            if (config.label == "Password" && config.type !== "text") {
              config.type = "text";
            }
            return config;
          });
          return temp;
        });
      }
    }
    return true;
  };

  const handleSave = () => {
    console.log(saveRef.current.checked);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Login</h1>
      <div id={styles.loginError}>Invalid email id or password</div>
      <div className={styles.form}>
        {inputControl?.map(
          ({ label, type, model, value, errorMessage }, index) => {
            return (
              <div className={styles.row} key={`row_${index}`}>
                <label htmlFor={model}>{label}:</label>
                <Input
                  type={type}
                  model={model}
                  value={value}
                  handleChange={handleChange}
                  id={`inp_${index}`}
                />
                {model == "pwd" && (
                  <div id={styles.eyeBlock}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className={`bi bi-eye ${styles.eyeOpen}`}
                      viewBox="0 0 16 16"
                      onClick={(e) => showPassword(e, model)}
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className={`bi bi-eye-slash ${styles.eyeClose}`}
                      viewBox="0 0 16 16"
                      onClick={(e) => showPassword(e, model)}
                    >
                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                      <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                    </svg>
                  </div>
                )}
                <div className={styles.error}>{errorMessage}</div>
              </div>
            );
          }
        )}
        <div className={styles.features}>
          <div className="column">
            <input
              type="checkbox"
              name="rembMe"
              onChange={handleSave}
              ref={saveRef}
            />
            <label htmlFor="rembMe">Remember Me</label>
          </div>
          <Link href={"/forgotpassword"}>Forgot Password</Link>
        </div>
        <div className={styles.features}>
          <button className={styles.btn} onClick={handleLogin}>
            Login
          </button>
          <Link href={"/register"} className={styles.newUser}>
            New user?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
