export default function Loading() {
  return (
    <main className="absolute text-neutral-400 top-0 left-0 w-full h-full z-[99]">
      <div className="relative w-full h-full bg-green-400/50 backdrop-blur-[8px] flex flex-col gap-5 justify-center items-center z-[1]">
        <div className="w-[100px] aspect-square border-b-[5px] border-t-[5px] border-neutral-400 rounded-full animate-spin" />
        <p className="animate-pulse text-[20px] font-semibold">Loading...</p>
      </div>
      <div className="w-full h-full absolute top-0 bg-[url('/jpgs/PlaceholderMap.jpg')] bg-cover z-0"></div>
    </main>
  );
}
