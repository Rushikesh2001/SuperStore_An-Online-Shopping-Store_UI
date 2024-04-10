"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import styles from "./header.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";

export const Header = () => {
  const [mode, setMode] = useState("light");
  const [data, setData] = useState({});
  const toggleMode = (eve: React.BaseSyntheticEvent) => {
    const { id } = eve?.target;
    const ele = document.getElementById(id);
    const parentele = document.getElementById(styles.colorMode);
    console.log("ss");
    if (ele && parentele) {
      if (mode == "light") {
        ele.style.transform = "translateX(27px)";
        parentele.style.backgroundColor = "#4c3e3e";
        parentele.style.borderColor = "#d1d1e1";
        document.body.style.backgroundColor = "#060547";
        setMode("dark");
      } else {
        ele.style.transform = "translateX(0)";
        parentele.style.backgroundColor = "#5d5ddf";
        parentele.style.borderColor = "#5d5ddf";
        document.body.style.backgroundColor = "white";
        setMode("light");
      }
    }
  };
  // var ref = useRef(true);
  const state = useSelector((state) => state.isLoggedIn);
  useEffect(() => {
    if (state) {
      debugger;
      let _id;
      if (localStorage.getItem("objectId")) {
        _id = localStorage.getItem("objectId");
        sessionStorage.setItem("objectId", _id);
      } else {
        _id = sessionStorage.getItem("objectId");
      }
      fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/profile/session`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          oid: _id,
        }),
      })
        .then((res) => res.json)
        .then((data) => {
          if (data.status) {
            throw new Error("Data fetch failed");
          } else {
            console.log(data);
            setData(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // return () => {
    //   ref.current = false;
    // };
  }, [state?.isLoggedIn]);

  return (
    <>
      <nav className={styles.menu}>
        <div id={styles.navTitle}>
          <Image
            src="/superStoreIcon.png"
            height={100}
            width={200}
            priority={true}
            alt="Super Store"
          />
        </div>
        <div id={styles.searchBox}>
          <input
            type="search"
            name="searchBox"
            id={styles.search}
            placeholder="Search for mobiles,toys,electronics and much more....."
          />
        </div>
        {data.name !== undefined && <p>{data.name}</p>}
        <button className={styles.login}>
          <Link href="/login">Login</Link>
        </button>
        <div id="cart">
          <i aria-hidden className="fa-solid fa-cart-shopping"></i>
        </div>
        <div id={styles.colorMode}>
          <div id={styles.circle} onClick={toggleMode}></div>
        </div>
        <div id={styles.userInfoDropdown}>
          <i aria-hidden className="fa-regular fa-circle-user"></i>
        </div>
      </nav>
    </>
  );
};
