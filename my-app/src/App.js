import Footer from "./components/footer/Footer.jsx";
import Header from "./components/header/Header.jsx";
import PageRoutes from "./PageRoutes.js";

// import { PostsContextProvider } from "./store/postsContext/Context.jsx";
// import { SearchContextProvider } from "./store/searchContext/Context.jsx";

function App() {
  return (
    <>
      {/* <PostsContextProvider>
          <SearchContextProvider> */}
      <Header />
      <PageRoutes />
      <Footer />
      {/* </SearchContextProvider>
          </PostsContextProvider> */}
    </>
  );
}

export default App;
