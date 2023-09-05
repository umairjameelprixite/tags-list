import "./App.css";
import TagInput from "./TagInput";

function App() {
  return (
    <div className="App">
      <h1>Tag Input with Autocomplete</h1>
      <TagInput suggestions={["tag1", "tag2", "tag3", "tag4", "tag5"]} />
      <div>
        <p style={{ color: "gray" }}>
          DEFAULT TAGS: tag1, tag2, tag3, tag4, tag5
        </p>
      </div>
    </div>
  );
}

export default App;
