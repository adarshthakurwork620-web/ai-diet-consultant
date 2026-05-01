function Onboarding() {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-green-600 mb-2">Welcome 👋</h1>
        <p className="text-gray-500 mb-6">Tell us about yourself to get started</p>

        <input type="text" placeholder="Your Name"
          className="w-full border border-gray-200 rounded-lg p-3 mb-3 focus:outline-none focus:border-green-400" />

        <input type="number" placeholder="Age"
          className="w-full border border-gray-200 rounded-lg p-3 mb-3 focus:outline-none focus:border-green-400" />

        <input type="number" placeholder="Weight (kg)"
          className="w-full border border-gray-200 rounded-lg p-3 mb-3 focus:outline-none focus:border-green-400" />

        <input type="number" placeholder="Height (cm)"
          className="w-full border border-gray-200 rounded-lg p-3 mb-3 focus:outline-none focus:border-green-400" />

        <select className="w-full border border-gray-200 rounded-lg p-3 mb-6 focus:outline-none focus:border-green-400">
          <option>Select Diet Type</option>
          <option>Vegetarian</option>
          <option>Non-Vegetarian</option>
          <option>Vegan</option>
          <option>Keto</option>
        </select>

        <button className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition">
          Get Started →
        </button>
      </div>
    </div>
  )
}

export default Onboarding