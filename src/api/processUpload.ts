import { API_URL } from "../config";

export async function uploadProcessFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    console.log(API_URL);
    const response = await fetch(`${API_URL}/api/v0/parsing-process`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Ошибка загрузки файла");
    }

    return response.json().catch(() => ({}));
}