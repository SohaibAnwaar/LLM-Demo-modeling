const Card = ({
  type = "question",
  content,
  creatorName = "Me",
}: ICardProps) => {
  return (
    <div
      className={`flex m-4 items-start gap-2.5 ${
        type === "answer" ? "flex-row-reverse" : ""
      }`}
    >
      <img
        className="w-8 h-8 rounded-full"
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Jese image"
      />
      <div
        className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 ${
          type === "answer" && "bg-teal-200"
        } rounded-lg ${
          type === "answer" ? "rounded-tr-none" : "rounded-tl-none"
        } dark:bg-gray-700`}
      >
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {creatorName}
          </span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
          {content}
        </p>
        {type !== "answer" && (
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Delivered
          </span>
        )}
      </div>
    </div>
  );
};

interface ICardProps {
  type?: ICardType;
  content: string;
  creatorName?: string;
}

export type ICardType = "question" | "answer";

export default Card;
