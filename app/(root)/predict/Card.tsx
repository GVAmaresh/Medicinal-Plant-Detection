import Image from "next/image";

interface CardProps {
  src?: string;
  text?: string;
  main?: string;
  confidence?: string;
  bgColor?: boolean;
  boxShadow?: boolean;
}

function Card({ src, text, confidence, main, bgColor=false, boxShadow = false }: CardProps) {
  return (
    <>
      <div
        className={`flex flex-col sm:flex-row items-center justify-evenly px-20 py-8 text-xl font-semibold comp ${
          boxShadow ? "cur-shadow" : ""
        }`}
      >
        <div className={`rounded-r-3xl ${bgColor ? " bg-white" : "bg-dark-4"}`}>
          <Image
            src={src ? src : ""}
            alt="upload"
            width={400}
            height={300}
            className="custom-rounded "
          />
        </div>
        <div className="flex flex-col justify-center sm:ml-4">
          {confidence == undefined ? (
            <div
              style={{ verticalAlign: "top" }}
              className="mt-10 text-center text-3xl w-96"
            >
              {text}
            </div>
          ) : (
            <table
              style={{ borderCollapse: "separate", borderSpacing: "10px" }}
            >
              <tbody>
                <tr>
                  <td
                    className="from-neutral-50 text-left"
                    style={{ verticalAlign: "top" }}
                  >
                    Name:
                  </td>
                  <td style={{ verticalAlign: "top" }}>{main == "" ? "Please give proper image" :main }</td>
                </tr>
                {/* <tr> 
                   <td
                    className="from-neutral-50 text-left"
                    style={{ verticalAlign: "top" }}
                  >
                    Confidence:
                  </td>
                  <td style={{ verticalAlign: "top" }}>{confidence}</td>
                </tr> */}
                <tr>
                  <td
                    className="from-neutral-50 text-left"
                    style={{ verticalAlign: "top" }}
                  >
                    Benefits:
                  </td>
                  <td
                    style={{ verticalAlign: "top" }}
                    className="sm:block hidden w-96"
                  >
                    {text}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
          {/* {text && (
            <div className="sm:hidden block">
              <div className="text-left pl-6 md:pl-1">{text}</div>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
}

export default Card;
