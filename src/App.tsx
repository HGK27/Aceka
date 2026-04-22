import { ThemeProvider } from "./context/ThemeContext";
import { StocksPage } from "./pages/StocksPage";

function App() {
  return (
    <ThemeProvider>
      <StocksPage />
    </ThemeProvider>
  );
}

export default App;
