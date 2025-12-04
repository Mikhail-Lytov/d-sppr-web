import React from "react";
import { Upload, Typography, message, Card } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from 'antd';
import type { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";
import { uploadProcessFile } from "../api/processUpload"; // <--- импорт внешнего сервиса

const { Dragger } = Upload;
const { Title, Text } = Typography;

const ProcessUploadPage: React.FC = () => {

    const customRequest = async (options: RcCustomRequestOptions) => {
        const { file, onSuccess, onError } = options;

        try {
            const result = await uploadProcessFile(file as File);
            onSuccess?.(result as any);
        } catch (e) {
            onError?.(e as any);
        }
    };

    const props: UploadProps = {
        name: "file",
        multiple: false,
        customRequest,
        onChange(info) {
            if (info.file.status === "done") {
                message.success("Файл успешно загружен");
            } else if (info.file.status === "error") {
                message.error("Ошибка загрузки");
            }
        },
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
            <Card style={{ width: 600, background: "#001529", color: "white" }}>
                <Title level={3} style={{ color: "white" }}>Загрузка файла бизнес-процесса</Title>
                <Text style={{ color: "white" }}>Загрузи файл, который будет обработан на бэкенде</Text>

                <div style={{ marginTop: 24 }}>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text" style={{ color: "white" }}>
                            Нажми или перетащи файл сюда
                        </p>
                        <p className="ant-upload-hint" style={{ color: "white" }}>
                            Поддерживается одиночная загрузка
                        </p>
                    </Dragger>
                </div>
            </Card>
        </div>
    );
};

export default ProcessUploadPage;