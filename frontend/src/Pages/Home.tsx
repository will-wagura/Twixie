import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaRegEnvelope, FaSearch } from "react-icons/fa";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoIosSearch } from "react-icons/io";
import "../Styles/Home.css";
import logo from "../assets/tl.png";
import { createTweet, getTweets } from "../services/api";

interface Tweet {
  id: number;
  username: string;
  content: string;
  timestamp: number;
}

const Home: React.FC = () => {
  console.log('Home component rendered');

  const [activeTab, setActiveTab] = useState("for-you");
  const [tweetText, setTweetText] = useState("");
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const data = await getTweets();
        setTweets(data);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };

    fetchTweets();
  }, []);

  const handleTweetTextChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTweetText(event.target.value);
  }, []);

  const handlePostTweet = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      console.log("Token:", token);

      const newTweet = await createTweet(tweetText, token);
      setTweetText("");
      setTweets([newTweet, ...tweets]);
    } catch (error) {
      console.error("Error posting tweet:", error);
    }
  }, [tweetText, tweets]);

  return (
    <div className="ho-container">
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <Link to="/home" className="sidebar-item">
          <FaHome className="sidebar-icon" />
          <span className="sidebar-label">Home</span>
        </Link>
        <Link to="/explore" className="sidebar-item">
          <IoIosSearch className="sidebar-icon" />
          <span className="sidebar-label">Explore</span>
        </Link>
        <Link to="/notifications" className="sidebar-item">
          <MdOutlineNotificationsActive className="sidebar-icon" />
          <span className="sidebar-label">Notifications</span>
        </Link>
        <Link to="/messages" className="sidebar-item">
          <FaRegEnvelope className="sidebar-icon" />
          <span className="sidebar-label">Messages</span>
        </Link>
        <Link to="/profile" className="sidebar-item">
          <CgProfile className="sidebar-icon" />
          <span className="sidebar-label">Profile</span>
        </Link>
      </div>
      <div className="main-content">
        <nav className="sticky-nav">
          <div
            className={`nav-item ${activeTab === "for-you" ? "active" : ""}`}
            onClick={() => setActiveTab("for-you")}
          >
            For You
          </div>
          <div
            className={`nav-item ${activeTab === "following" ? "active" : ""}`}
            onClick={() => setActiveTab("following")}
          >
            Following
          </div>
        </nav>
        <div className="content">
          <div className="content-section1">
            <div className="profile-post">
              <Link to="/profile">
                <CgProfile className="profile-icon" />
              </Link>
              <input
                type="text"
                placeholder="What is happening?!"
                className="post-input"
                value={tweetText}
                onChange={handleTweetTextChange}
              />
              <button className="post-button" onClick={handlePostTweet}>
                Post
              </button>
            </div>
          </div>
          <div className="content-section">
            <h2>Tweets</h2>
            {tweets.map((tweet) => (
              <div key={tweet.id} className="tweet">
                <div className="tweet-header">
                  <CgProfile className="tweet-profile-icon" />
                  <span>{tweet.username}</span>
                </div>
                <div className="tweet-content">{tweet.content}</div>
                <div className="tweet-timestamp">
                  {new Date(tweet.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="main-content2">
        <div className="sticky-search">
          <div className="search-container">
            <input type="text" className="search-input" placeholder="Search" />
            <button className="search-button">
              <FaSearch className="search-icon" />
            </button>
          </div>
        </div>
        <div className="content2">
          <div className="content-section2">
            <h3>Trending</h3>
            <div className="trending-item">
              <span className="trending-category">Politics · Trending</span>
              <h3 className="trending-topic">#RutoMustGO</h3>
              <span className="trending-tweets">500K Tweets</span>
            </div>
            <div className="trending-item">
              <span className="trending-category">Sports · Trending</span>
              <h3 className="trending-topic">Euro2024</h3>
              <span className="trending-tweets">1.2M Tweets</span>
            </div>
            <div className="trending-item">
              <span className="trending-category">Entertainment · Trending</span>
              <h3 className="trending-topic">#NewAlbumDrop</h3>
              <span className="trending-tweets">300K Tweets</span>
            </div>
            <div className="trending-item">
              <span className="trending-category">Technology · Trending</span>
              <h3 className="trending-topic">AI Breakthrough</h3>
              <span className="trending-tweets">150K Tweets</span>
            </div>
            <div className="trending-item">
              <span className="trending-category">Health · Trending</span>
              <h3 className="trending-topic">#VaccineUpdate</h3>
              <span className="trending-tweets">400K Tweets</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;