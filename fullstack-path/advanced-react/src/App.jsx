import { Suspense } from "react";
import Dashboard from "./Dashboard";
import Header from "./Header";

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Loading metrics...</p>}>
        <Dashboard />
      </Suspense>
    </>
  );
}

export default App;
