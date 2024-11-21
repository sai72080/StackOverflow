import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import "./HomePage.css";
import { FaRegCommentDots} from "react-icons/fa";
import { FaRegEye, FaThumbsUp } from "react-icons/fa";

function HomePage() {
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState("interesting");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `https://api.stackexchange.com/2.3/questions?order=desc&sort=${filter}&site=stackoverflow`
        );
        setQuestions(response.data.items);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, [filter]);

  return (
    <div className="homepage">
      <Header />
      <Sidebar />

      <main className="main-content">
        <div className="top-section">
          <h2>Top Questions</h2>
        </div>

        <div className="filters">
          {["interesting", "bountied", "hot", "week", "month"].map((item) => (
            <button
              key={item}
              className={`filter-button ${filter === item ? "active" : ""}`}
              onClick={() => setFilter(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>

          ))}
          <button className="ask-btn1">Ask Question</button>
        </div>


        <div className="questions">
          {questions.length > 0 ? (
            questions.map((question) => (
              <div className="question-card" key={question.question_id}>
                <h3>{question.title}</h3>
                <p>
                  {question.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </p>
                <div className="meta">
                  <span>
                    <FaThumbsUp className="icon" title="Votes" /> {question.score}
                  </span>
                  <span>
                    <FaRegCommentDots className="icon" title="Answers" />{" "}
                    {question.answer_count}
                  </span>
                  <span>
                    <FaRegEye className="icon" title="Views" /> {question.view_count}
                  </span>
                </div>
                <span className="asked">
                  Asked {new Date(question.creation_date * 1000).toLocaleString()}
                </span>
              </div>
            ))
          ) : (
            <p>Loading questions...</p>
          )}
        </div>
      </main>

      <RightSidebar />
    </div>
  );
}

export default HomePage;
