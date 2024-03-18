import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function AppFooter() {
  const router = useRouter();
  const drawer = (
    <div
      className="myava-footer"
      style={{
        height: "100px",
        padding: "15px",
        backgroundImage: "linear-gradient(to right, #c62675, #ef7795)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <div
          style={{ fontSize: "18px", color: "#fff", fontWeight: "bold" }}
          onClick={() => {
            router.push({ pathname: "/about" });
          }}
        >
          About Us
        </div>
        <div>
          <span style={{ fontSize: "18px", color: "#fff", fontWeight: "bold" }}>
            Contact Us :{" "}
          </span>
          <span style={{ fontSize: "14px", color: "#fff" }}>
            hello@myava.in
          </span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "14px", color: "#fff" }}>ⓒ My Ava 2022</div>
        <div>
          <Link href="/assets/T&cs_myava.pdf">
            <span
              style={{ fontSize: "18px", color: "#fff", fontWeight: "bold" }}
            >
              T & C |{" "}
            </span>
          </Link>
          <Link href="/assets/Privacy Policy_myava (25.08.20).docx.pdf">
            <span style={{ fontSize: "14px", color: "#fff" }}>
              Privacy Policy
            </span>
          </Link>
        </div>
      </div>
    </div>
  );

  return drawer;
}
