import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1 flex flex-col">
            <Outlet />
          </div>
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
