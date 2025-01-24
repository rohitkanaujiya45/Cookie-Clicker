import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Clicker = () => {
  const [score, setScore] = useState(0);
  const [prizes, setPrizes] = useState(0);
  const [userId] = useState("user123");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:3001/fetch/events", { userId })
      .then((res) => {
        if (res.data.ststus) {
          setScore(res.data.responseObject.totalScore);
          setPrizes(res.data.responseObject.prizesWon);
        }
      })
      .catch(() => console.log("Error fetching user data"));
  }, [userId]);

  const handleClick = () => {
    axios
      .post("http://localhost:3001/click/events", { userId })
      .then((res) => {
        if (res.data.ststu) {
          
          if (res.data.totalScore > score) {
            setNotificationMessage("You earned 10 points!");
            setNotificationType("points"); 
            setShowNotification(true);
          }
          if (res.data.prizesWon > prizes) {
            setNotificationMessage("🏆 Congratulations! You won a prize!");
            setNotificationType("prize"); 
            setShowNotification(true);
          }

          setScore(res.data.totalScore);
          setPrizes(res.data.prizesWon);

          setTimeout(() => setShowNotification(false), 3000);
        }
      })
      .catch(() => console.log("Error updating data"));
  };

  const notificationStyles = {
    points: {
      background: "linear-gradient(135deg,rgb(0, 120, 28),rgb(51, 223, 57))",
      icon: "🎯",
    },
    prize: {
      background: "linear-gradient(135deg,rgb(168, 101, 0), #ffc107)",
      icon: "🏅",
    },
  };

  return (
    <div
      className="clicker-container min-vh-100 d-flex flex-column justify-content-center align-items-center"
      style={{
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        color: "#fff",
      }}
    >
      <div className="text-center mb-5">
        <h1 className="title fw-bold">Cookie Clicker Game</h1>
        <p className="title fw-bold" style={{ padding: "10px" }}>Click the button to earn points and win exciting prizes!</p>
      </div>

      <div
        className="card shadow-lg p-4 text-center"
        style={{ maxWidth: "400px", backgroundColor: "rgba(255, 255, 255, 0.9)", borderRadius: "15px" }}
      >
        <h2 className="mb-4">Game Status</h2>
        <p className="h5">
          <strong>Your Score:</strong> <span className="text-primary">{score}</span>
        </p>
        <p className="h5">
          <strong>Prizes Won:</strong> <span className="text-success">{prizes}</span>
        </p>
        <button
          className="btn btn-lg btn-warning mt-4 px-5 fw-bold"
          onClick={handleClick}
          style={{ borderRadius: "25px" }}
        >
          Click Me
        </button>
      </div>

     
      {showNotification && (
        <div
          className="custom-notification position-fixed"
          style={{
            top: "50%",
            left: "70%",
           
            zIndex: 1055,
            color: "#fff",
            borderRadius: "15px",
            padding: "20px 30px",
            boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.3)",
            transition: "all 0.5s ease-in-out",
            animation: "slideIn 0.5s ease-out",
            background: notificationStyles[notificationType].background,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong style={{ fontSize: "18px", color:"black" }}>
              {notificationStyles[notificationType].icon} Reward {notificationStyles[notificationType].icon}
            </strong>
            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Close"
              onClick={() => setShowNotification(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              ✖
            </button>
          </div>
          <div style={{ marginTop: "10px", marginLeft: "2px", fontSize: "16px" }}>{notificationMessage}</div>
        </div>
      )}

      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateY(-100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Clicker;
