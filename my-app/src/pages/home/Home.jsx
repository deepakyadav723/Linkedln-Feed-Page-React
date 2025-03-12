import User from "./components/user/User.jsx";
import ProfileInfo from "./components/profileInfo/ProfileInfo.jsx";
import CreateNewPost from "./components/createNewPost/CreateNewPost.jsx";
import Filter from "./components/filter/Filter.jsx";
import Posts from "./components/posts/Posts.jsx";
// import { HomeContextProvider } from "../../store/homeContext/Context.jsx";

import "./home.css";

const Home = () => {
  return (
    // <HomeContextProvider>
    <main className="container">
      <section className="leftContainer">
        <User />
        <ProfileInfo />
      </section>
      <section className="rightContainer">
        <CreateNewPost />
        <Filter />
        <Posts />
      </section>
    </main>
    // </HomeContextProvider>
  );
};

export default Home;
