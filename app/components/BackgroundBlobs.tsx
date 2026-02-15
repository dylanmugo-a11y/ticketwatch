export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-green-50 to-orange-50" />

      {/* Animated blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-green-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
      <div className="absolute top-[20%] right-[-5%] w-72 h-72 bg-yellow-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob-slow animation-delay-2000" />
      <div className="absolute bottom-[-10%] left-[20%] w-72 h-72 bg-orange-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob-slower animation-delay-4000" />
      <div className="absolute top-[50%] left-[50%] w-64 h-64 bg-green-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
      <div className="absolute bottom-[20%] right-[10%] w-56 h-56 bg-yellow-200/25 rounded-full mix-blend-multiply filter blur-3xl animate-blob-slow" />
    </div>
  );
}
