import MySidebar from "./sidebar";

function App() {
  return (
     <div className="flex h-screen">
      <MySidebar />
      <main className="flex-grow p-4">
        {/* contenuto */}
      </main>
    </div>
  );
}

export default App;
