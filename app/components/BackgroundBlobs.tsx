'use client';

export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-summer-sand">
      {/* Warm summer washes */}
      <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] animate-float bg-summer-coral/20" />
      <div className="absolute top-[25%] right-[-8%] w-[450px] h-[450px] rounded-full blur-[120px] animate-float-slow bg-summer-yellow/25" />
      <div className="absolute bottom-[-10%] left-[25%] w-[400px] h-[400px] rounded-full blur-[120px] animate-float-slower bg-summer-teal/15" />
      <div className="absolute top-[55%] left-[5%] w-[350px] h-[350px] rounded-full blur-[100px] animate-float-slow bg-summer-pink/15" />
      <div className="absolute top-[10%] right-[20%] w-[300px] h-[300px] rounded-full blur-[100px] animate-float-slower bg-summer-orange/15" />
    </div>
  );
}
