import ArticleEditor from "./components/ArticleEditor/ArticleEditor";
import NotificationBell from "./components/NotificationBell/NotificationBell";
import "./styles/main.scss";

function App() {
  return (
    <>
      <header>
        <NotificationBell />
      </header>
      <main>
        <ArticleEditor />
      </main>
    </>
  );
}

export default App;
