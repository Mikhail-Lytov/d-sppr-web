import { API_BD_URL } from "../config";
import type {FileResponse} from "./dto/filreResponse.ts";

export async function fetchOperations(page = 0, size = 10) : Promise<FileResponse> {
    const requestBody = {
        filters: [],
        sorts: [],
        page,
        size
    };

    const response = await fetch(`${API_BD_URL}/api/v0/file/search`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        throw new Error("Ошибка загрузки данных таблицы");
    }

    return await response.json() as Promise<FileResponse>;
}