import { useMutation} from "react-query";
import { askQuestion, uploadCSV } from "../util/api";
import toast from "react-hot-toast";

export const useUploadCSV = (onSuccess: () => void) => useMutation({
    mutationFn:  (formData: FormData) => uploadCSV(formData),
    onSuccess: () => {
        onSuccess();
        toast.success("File Uploaded Successfully")
    },
    onError: () => {
        onSuccess();
        toast.error("Something went wrong!")
    }


  }) 

export const useAskQuestion = (onSuccess: (data: any) => void) => useMutation({
    mutationFn:  (query: string) => askQuestion(query),
    onSuccess: (data) => {
        onSuccess(data);
    },
    onError: () => {
        toast.error("Something went wrong!")
    }


  }) 