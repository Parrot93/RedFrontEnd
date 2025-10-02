import Sidebar from "./SidebarComponent.jsx";

function App() {
  return (
     <div className="flex h-screen">
      <Sidebar />
      <main className="flex-grow p-4">
        {/* contenuto */}
      </main>
    </div>
  );
}

export default App;
