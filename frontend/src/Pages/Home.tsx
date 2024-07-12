import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaRegEnvelope, FaSearch, FaRetweet, FaHeart, FaShareAlt, FaReply, FaTrash } from "react-icons/fa";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoIosSearch } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/Home.css";
import logo from "../assets/tl.png";
import { createTweet, getTweets, deleteTweet } from "../services/api";

interface Tweet {
  id: number;
  username: string;
  content: string;
  timestamp: number;
  liked: boolean;
  retweeted: boolean;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("for-you");
  const [tweetText, setTweetText] = useState("");
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const data = await getTweets();
        setTweets(data.sort((a, b) => b.timestamp - a.timestamp));
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };

    fetchTweets();
  }, []);

  const handleTweetTextChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTweetText(event.target.value);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePostTweet = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You need to be logged in to post a tweet!");
        return;
      }

      const newTweet = await createTweet(tweetText, token);
      setTweetText("");
      setTweets([newTweet, ...tweets].sort((a, b) => b.timestamp - a.timestamp));
    } catch (error) {
      console.error("Error posting tweet:", error);
    }
  }, [tweetText, tweets]);

  const handleRetweet = useCallback(async (tweetId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You need to be logged in to retweet!");
        return;
      }

      const response = await fetch(`/api/retweet/${tweetId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Error retweeting tweet");
      }

      const updatedTweets = tweets.map(tweet =>
        tweet.id === tweetId ? { ...tweet, retweeted: !tweet.retweeted } : tweet
      );
      setTweets(updatedTweets);
    } catch (error) {
      console.error("Error retweeting tweet:", error);
    }
  }, [tweets]);

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');

    // Redirect to login or home page
    navigate('/login');
  };

  const handleLike = useCallback(async (tweetId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You need to be logged in to like a tweet!");
        return;
      }

      const response = await fetch(`/api/like/${tweetId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Error liking tweet");
      }

      const updatedTweets = tweets.map(tweet =>
        tweet.id === tweetId ? { ...tweet, liked: !tweet.liked } : tweet
      );
      setTweets(updatedTweets);
    } catch (error) {
      console.error("Error liking tweet:", error);
    }
  }, [tweets]);

  const handleReply = (tweetId: number) => {
    console.log(`Replying to tweet with ID: ${tweetId}`);
  };

  const handleDeleteTweet = useCallback(async (tweetId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You need to be logged in to delete a tweet!");
        return;
      }

      const response = await deleteTweet(tweetId, token);
      if (response.status === 204) {
        const updatedTweets = tweets.filter(tweet => tweet.id !== tweetId);
        setTweets(updatedTweets);
      } else {
        throw new Error("Failed to delete tweet");
      }
    } catch (error) {
      console.error("Error deleting tweet:", error);
    }
  }, [tweets]);

  const handleProfileClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to be logged in to view your profile!");
      return;
    }
    navigate("/profile");
  };

  const filteredTweets = tweets.filter(tweet =>
    tweet.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ho-container">
      <ToastContainer />
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
        <div className="sidebar-item" onClick={handleProfileClick}>
          <CgProfile className="sidebar-icon" />
          <span className="sidebar-label">Profile</span>
        </div>
        <Link to="/login" className="sidebar-item">
          <button className="login-button">Login</button>
        </Link>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
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
            {filteredTweets.map((tweet) => (
              <div key={tweet.id} className="tweet">
                <div className="tweet-header">
                  <CgProfile className="tweet-profile-icon" />
                  <span>{tweet.username}</span>
                </div>
                <div className="tweet-content">{tweet.content}</div>
                <div className="tweet-timestamp">
                  {new Date(tweet.timestamp).toLocaleString()}
                </div>
                <div className="tweet-actions">
                  <button onClick={() => handleRetweet(tweet.id)}>
                    <FaRetweet /> {tweet.retweeted ? 'Undo Retweet' : 'Retweet'}
                  </button>
                  <button onClick={() => handleLike(tweet.id)}>
                    <FaHeart /> {tweet.liked ? 'Unlike' : 'Like'}
                  </button>
                  <button onClick={() => handleReply(tweet.id)}>
                    <FaReply /> Reply
                  </button>
                  <button onClick={() => handleDeleteTweet(tweet.id)}>
                    <FaTrash /> Delete
                  </button>
                  {/* Missing handleShare function implementation */}
                  {/* <button onClick={() => handleShare(tweet.id)}>
                    <FaShareAlt /> Share
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="main-content2">
        <div className="sticky-search">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
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