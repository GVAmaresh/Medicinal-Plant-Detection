import Image from "next/image";

interface CardProps {
  src?: string;
  text?: string;
  main?: string;
  boxShadow?: boolean;
}

function Card({ src, text, main, boxShadow = false }: CardProps) {
  return (
    <>
      <div
        className={`flex flex-col sm:flex-row items-center justify-evenly px-20 py-8 text-xl font-semibold ${
          boxShadow ? "cur-shadow" : ""
        }`}
      >
        <div className="rounded-r-3xl bg-white">
          <Image src={src?src:""} alt="upload" width={400} height={300} />
        </div>
        <div className="flex flex-col justify-center sm:ml-4">
          <h1>{main ? main : ""}</h1>
          <div className="from-neutral-50 text-center">{text?text:""}</div>
        </div>
      </div>
    </>
  );
}

export default Card;
