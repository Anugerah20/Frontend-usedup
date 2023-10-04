import Index from "./pages/Index";
import LoginCard from "./components/LoginCard";
import RegisterCard from "./components/RegisterCard";

function App() {
  return (
    <>
      <div className="flex">
        <LoginCard />
        <RegisterCard />
      </div>
    </>
  );
}

export default App;
