"use client";
import React, { BaseSyntheticEvent, useRef, useState } from "react";
import styles from "./security.module.css";
import { cases } from "./configuration";
import { useRouter } from "next/navigation";
import Error from "next/error";

const Security = () => {
  const [conditions, setConditions] = useState(cases);
  const pwdRef = useRef();
  const errRef = useRef();
  const router = useRouter();
  const [type, setType] = useState("password");
  var timer: string;

  const handleChange = (eve: BaseSyntheticEvent) => {
    const { value } = eve?.target;
    setConditions((cond) => {
      var temp = cond.map((obj) => {
        if (!obj.status && obj.pattern.test(value)) {
          obj.status = true;
        } else if (!obj.pattern.test(value)) {
          obj.status = false;
        }
        return obj;
      });
      return temp;
    });
  };

  const debounce = (eve: BaseSyntheticEvent) => {
    clearTimeout(timer);
    timer = setTimeout(handleChange(eve), 4000);
  };

  const handleSubmit = async () => {
    var satisfied = conditions.every(({ status }) => {
      return status === true;
    });
    if (satisfied) {
      let detail = JSON.parse(sessionStorage.getItem("userDetails"));
      // detail.pwd = pwdRef.current.value;
      // sessionStorage.removeItem("userDetails");
      console.log("Password saved");
      try {
        let res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/profile/register`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(detail),
          }
        );
        res = await res.json();
        console.log(res);
        router.push("/");
      } catch (error) {
        console.log(error);
        throw new Error(error.message);
        return <Error title={error.message} statusCode={error.code}></Error>;
      }
    } else {
      errRef.current.style.display = "flex";
    }
  };

  const showPassword = (eve: React.BaseSyntheticEvent) => {
    // eve?.stopPropagation();
    const cname = eve?.target.classList[1];
    const open = document.querySelector(".bi-eye");
    const close = document.querySelector(".bi-eye-slash");
    const inp = document.getElementsByName("pwd")[0];
    if (cname && open && close) {
      if (cname == "bi-eye") {
        open.style.display = "none";
        close.style.display = "flex";
        setType("password");
      } else {
        close.style.display = "none";
        open.style.display = "flex";
        setType("text");
      }
    }
    return true;
  };

  return (
    <div className={styles.encryptForm}>
      <h1 className={styles.formHeader}>Account Encryption</h1>
      <label htmlFor="pwd">Enter a password:</label>
      <input type={type} name="pwd" ref={pwdRef} onChange={debounce} />
      <div id={styles.error} ref={errRef}>
        Try to resolve failed conditions and try again!
      </div>
      <div id={styles.eyeBlock}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className={`bi bi-eye ${styles.eyeOpen}`}
          viewBox="0 0 16 16"
          onClick={(e) => showPassword(e)}
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
          onClick={(e) => showPassword(e)}
        >
          <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
          <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
          <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
        </svg>
      </div>
      <ul className={styles.pwdConditions}>
        {conditions?.map(({ message, status }, index) => {
          var symbol;
          symbol = (
            <i
              aria-hidden
              className={`${styles.faIcons} fa-solid ${
                status ? "fa-check" : "fa-xmark"
              }`}
              style={status ? { color: "#FFD43B" } : { color: "#ff0000" }}
            ></i>
          );
          return (
            <li className={styles.caseBox} key={`#case${index + 1}`}>
              {symbol}
              <p className={styles.message}>{message}</p>
            </li>
          );
        })}
      </ul>
      <input type="submit" value="Save password" onClick={handleSubmit} />
      <p className={styles.note}>
        <b>Note:</b> Choose a wise and unique password for your Superstore
        account
      </p>
    </div>
  );
};

export default Security;
