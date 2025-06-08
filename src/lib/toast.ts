import {toast} from "sonner";
import {isAxiosError} from "axios";

export function handleRequestSuccess(message: string) {
    toast.success(message);
}

export function handleRequestError(error: unknown) {
    let errorMessage = 'Ocorreu um erro inesperado';

    if (isAxiosError(error) && error.response) {
        const apiErrorMessage = error.response.data?.message;
        if (apiErrorMessage) {
            errorMessage = apiErrorMessage;
        } else {
            errorMessage = error.message;
        }
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    }

    toast.error(errorMessage);
}
