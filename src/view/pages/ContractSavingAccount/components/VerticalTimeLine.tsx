import classNames from "classnames";
import { FC } from "react";

interface IVerticalTimeLineProps {
  items: { id?: string; text: string }[];
  activeId?: string;
}

export const VerticalTimeLine: FC<IVerticalTimeLineProps> = (props) => {
  return (
    <>
      {props.items?.length != 0 ? (
        <div className="flex flex-col sm:py-12">
          <ul className="list-none">
            {props.items.map((item, index, array) => (
              <li key={index}>
                <div className="flex flex-row">
                  <div className="items-center flex flex-col justify-around h-16 ">
                    {item.id == props.activeId ? (
                      <div className="bg-white border-[2.5px] border-success rounded-full h-[16px] w-[14px] flex flex-grow justify-around"></div>
                    ) : array.findIndex((a) => a.id == props.activeId) >= index ? (
                      <div className="bg-success border-[2.5px] border-success rounded-full h-[16px] w-[14px] flex flex-grow justify-around"></div>
                    ) : (
                      <div className="bg-gray-300 border-4 border-gray-300 rounded-full h-[16px] w-[14px] flex flex-grow justify-around"></div>
                    )}
                    <div
                      style={{
                        borderWidth: index == array.length - 1 ? "0px" : "1.2px",
                      }}
                      className={classNames("h-full", {
                        "border-success":
                          array.findIndex((a) => a.id == props.activeId) > index,
                      })}
                    ></div>
                  </div>
                  <div className="flex flex-col group-hover:bg-white ml-2 px-2  pr-6 rounded-xl">
                    <div
                      className={classNames("text-base", {
                        "font-bold": item.id == props.activeId,
                      })}
                    >
                      {item.text}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
