import React from 'react';
import { Upload, Typography, message, Card } from 'antd';
import type { UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const { Title, Text } = Typography;

const ProcessUploadPage: React.FC = () => {
    const props: UploadProps = {
        name: 'file',
        multiple: false,                         // один файл, если нужно несколько — поставь true
        beforeUpload: (file) => {
            // здесь можно проверить тип/размер файла
            // например, только .json или .csv
            // if (file.type !== 'application/json') { ... }

            // ВАЖНО: возвращаем false, чтобы AntD не отправлял файл сам
            // ты сам потом заберёшь file из onChange и отправишь на свой бек
            return false;
        },
        onChange(info) {
            const { status } = info.file;

            // так как beforeUpload возвращает false, статус будет "done" только если ты сам поставишь
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} успешно загружен`);
            } else if (status === 'error') {
                message.error(`${info.file.name} не удалось загрузить`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <Card>
            <Title level={3} style={{ marginBottom: 16 }}>
                Загрузка файла для обработки
            </Title>

            <Text type="secondary">
                Выберите файл или перетащите его в область ниже. После выбора ты сможешь
                отправить его на свой бекенд для обработки.
            </Text>

            <div style={{ marginTop: 24 }}>
                <Dragger {...props} style={{ padding: 24 }}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Нажми или перетащи файл сюда</p>
                    <p className="ant-upload-hint">
                        Поддержка одиночной загрузки. Правила валидации можно прописать в beforeUpload.
                    </p>
                </Dragger>
            </div>
        </Card>
    );
};

export default ProcessUploadPage;