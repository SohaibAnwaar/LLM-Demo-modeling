import { useEffect, useState } from "react";
import Card, { ICardType } from "./Card";
import Uploader from "./Uploader";
import { useAskQuestion, useUploadCSV } from "../../hooks";
import { Spinner } from "flowbite-react";

const QA = () => {
  const [question, setQuestion] = useState("");
  const [csvFile, setCsvFile] = useState<File>();
  const [chat, setChat] = useState<IChatList[] | undefined>();

  const onSuccess = () => setCsvFile(undefined);
  const { mutate, isLoading, isSuccess } = useUploadCSV(onSuccess);
  const askQuestion = useAskQuestion((data) => {
    const chatClone = [...chat!];
    chatClone[chatClone?.length - 1]["answer"] = {
      type: "answer",
      content: data,
      creatorName: "Bot",
    };
    setChat(chatClone);
  });

  const handleAsk = () => {
    if (!question) return;
    setQuestion("");
    setChat((prevState: IChatList[] | undefined) => {
      if (prevState) {
        return [
          ...prevState,
          {
            question: {
              type: "question",
              content: question,
              creatorName: "Me",
            },
          },
        ];
      } else {
        setChat([
          {
            question: {
              type: "question",
              content: question,
              creatorName: "Me",
            },
          },
        ]);
      }
    });
  };

  useEffect(() => {
    if (csvFile) {
      const formData = new FormData();
      formData.append("file", csvFile);
      mutate(formData);
    }
  }, [csvFile]);

  useEffect(() => {
    if (chat && !chat[chat.length - 1].answer) {
      askQuestion.mutate(chat[chat.length - 1].question.content);
    }
  }, [chat]);

  if (isLoading) {
    return (
      <div className="flex-1 p-4 flex items-center justify-center">
        <Spinner color="purple" aria-label="Uploading CSV...." size="lg" />
        <span className="ml-2 text-gray-400">Uploading CSV....</span>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {isSuccess ? (
        <>
          <div className="flex-1">
            <Card
              type="answer"
              content="Hi There! Welcome I've gone through the uploaded CSV now you can ask me anything regarding the Document."
              creatorName="Bot"
            />
            {chat?.map(({ question, answer }, index) => {
              return (
                <>
                  <Card
                    key={index}
                    type={question.type}
                    content={question.content}
                    creatorName={question.creatorName}
                  />
                  {answer && (
                    <Card
                      type={answer.type}
                      content={answer.content}
                      creatorName={answer.creatorName}
                    />
                  )}
                </>
              );
            })}
            {askQuestion.isLoading && (
              <div className="flex justify-center mb-4">
                <Spinner color="purple" aria-label="Uploading CSV...." />
              </div>
            )}
          </div>
          <div className="flex justify-center p-2 bg-indigo-600">
            <div className="relative max-w-xs">
              <input
                type="text"
                placeholder="Ask Something..."
                className="w-full pl-12 pr-3 py-2 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-l-lg"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <button
              disabled={!question || askQuestion.isLoading}
              className="flex items-center gap-2 px-4 py-2 text-indigo-600 bg-indigo-50 rounded-r-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200"
              onClick={handleAsk}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                  clipRule="evenodd"
                />
              </svg>
              Ask!
            </button>
          </div>
        </>
      ) : (
        <div className="flex-1 p-4 flex flex-col align-center justify-center">
          <h1 className="text-center mb-4 text-xl font-semibold text-indigo-600 ">
            Please Upload a csv file
          </h1>
          <Uploader csvFile={csvFile} setCsvFile={setCsvFile} />
        </div>
      )}
    </div>
  );
};

interface IChat {
  type: ICardType;
  content: string;
  creatorName: string;
}
interface IChatList {
  question: IChat;
  answer?: IChat;
}

export default QA;
