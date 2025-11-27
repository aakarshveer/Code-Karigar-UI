"use client";
import { useState } from "react";

export default function Home() {
  const [projectName, setProjectName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      // Backend se baat karo
      const res = await fetch("http://127.0.0.1:8000/generate-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_name: projectName,
          prompt: prompt,
          github_push: true,
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      alert("⚠️ Error: Backend Server nahi chal raha! (Run 'uvicorn api:app')");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500 selection:text-white">
      {/* Navbar */}
      <nav className="p-6 border-b border-gray-800 flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 cursor-pointer">
          Code-Karigar 🧞
        </h1>
        <div className="space-x-4">
          <span className="text-gray-400 text-sm">Powered by Llama 3.3</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto mt-12 p-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-6">
            Build Software at <span className="text-purple-500">Light Speed</span> ⚡
          </h2>
          <p className="text-xl text-gray-400">
            Just describe your idea. Our AI Agent will architect, code, and deploy it to GitHub instantly.
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 p-8 rounded-2xl shadow-2xl shadow-purple-900/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Project Name</label>
              <input
                type="text"
                required
                className="w-full bg-black border border-gray-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-purple-500 outline-none transition"
                placeholder="e.g. My-Dream-Startup"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Describe Your Idea</label>
              <textarea
                required
                rows="4"
                className="w-full bg-black border border-gray-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-purple-500 outline-none transition"
                placeholder="e.g. A crypto dashboard with dark mode, live charts, and a connect wallet button..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl text-lg transition-all transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? "🤖 AI is Architecting... (Please Wait)" : "🚀 Launch Project"}
            </button>
          </form>
        </div>

        {/* Result Area */}
        {result && (
          <div className="mt-10 bg-gradient-to-br from-green-900/20 to-black border border-green-500/30 p-8 rounded-2xl animate-pulse-once">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-500 rounded-full p-2">✅</div>
              <h3 className="text-2xl font-bold text-white">Project Deployed Successfully!</h3>
            </div>
            
            <p className="text-gray-300 mb-6">{result.message}</p>
            
            <div className="flex gap-4">
              {result.github_url && result.github_url !== "Skipped" && (
                <a
                  href={result.github_url}
                  target="_blank"
                  className="flex-1 text-center bg-gray-800 hover:bg-gray-700 text-white px-6 py-4 rounded-xl font-bold transition border border-gray-600 flex items-center justify-center gap-2"
                >
                  🐙 Open GitHub Repo
                </a>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}