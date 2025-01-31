function LogoutCountdown({ secondsLeft }) {
  return (
    <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50">
      <p>Session expiring in {secondsLeft} seconds</p>
      <p>You will be logged out automatically</p>
    </div>
  );
}