import { API_URL, API_BD_URL } from "../config";
import type {PresignedUploadResponse} from "./dto/PresignedUploadResponse"

export async function uploadProcessFile(file: File) {
    const requestBody = {
        filename: file.name,
        mimeType: file.type
    }

    // 1. Получаем пресайнд ссылку
    const response = await fetch(`${API_BD_URL}/api/v0/minio/presign/put`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        throw new Error("Ошибка получения presigned URL");
    }

    const presigned: PresignedUploadResponse = await response.json();

    // 2. Загружаем файл по presigned URL
    const uploadResp = await fetch(presigned.uploadUrl, {
        method: "PUT",
        headers: {
            "Content-Type": file.type, // важно!
        },
        body: file,
    });

    if (!uploadResp.ok) {
        throw new Error("Ошибка загрузки файла на presigned URL");
    }

}