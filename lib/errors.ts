import axios from "axios";

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (typeof message === "string" && message) return message;
    return "Impossible de joindre le serveur. Veuillez réessayer.";
  }
  if (error instanceof Error && error.message) return error.message;
  return "Une erreur est survenue. Veuillez réessayer.";
}
