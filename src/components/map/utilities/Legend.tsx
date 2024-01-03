interface LegendProps {
  title?: string;
  colorArr: string[];
  labelArr: string[];
}

export default function Legend(props: LegendProps) {
  const { title, colorArr, labelArr } = props;

  try {
    if (!colorArr) throw new Error("colorArr must be provided");
    if (!labelArr) throw new Error("labelArr must be provided");
    if (colorArr.length !== labelArr.length)
      throw new Error("colorArr and labelArr must have the same length");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return null;
  }

  return (
    <section className="absolute text-[10px] md:text-[12px] shadow-md rounded-[5px] bottom-0 left-0 p-[8px] md:p-[15px] bg-white outline outline-1 m-5 !z-[10] flex flex-col gap-1">
      <h1 className="text-[12px] md:text-[14px] font-semibold">{title}</h1>
      {colorArr.map((color, index) => (
        <div key={index} className="flex items-center gap-3">
          <div
            className={`${color} w-[30px] md:w-[50px] aspect-[5/2] outline outline-1 outline-slate-500`}
          />
          <p>{labelArr[index]}</p>
        </div>
      ))}
    </section>
  );
}
