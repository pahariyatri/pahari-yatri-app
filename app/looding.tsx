


export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="flex justify-center items-center h-screen">
        <div className="relative inline-block">
          <div
            className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-purple-400 opacity-75"></div>
          <div className="relative inline-flex rounded-full h-10 w-10 bg-purple-500"></div>
        </div>
      </div>
    </div>
  )
}
