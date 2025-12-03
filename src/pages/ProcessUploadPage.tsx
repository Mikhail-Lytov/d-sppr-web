import React from 'react';
import { Upload, Typography, message, Card } from 'antd';
import type { UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const { Title, Text } = Typography;

const ProcessUploadPage: React.FC = () => {
    const props: UploadProps = {
        name: 'file',
        multiple: false,
        beforeUpload: (file) => {
            // валидация файла (тип/размер и т.д.)
            // например:
            // if (file.type !== 'application/json') {
            //     message.error('Можно загружать только JSON');
            //     return Upload.LIST_IGNORE;
            // }
            message.success(`Файл ${file.name} добавлен в очередь на загрузку`);
            return false; // чтобы не загружать автоматически
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        // ВАЖНО: контейнер подстраивается под flex-родителя из MainLayout
        <div style={{ background: '#0D3447FF' }}>
            <Card
                title="Загрузка файла бизнес-процесса"
                style={{ background: '#0D3447FF' }}
            >
                <div
                    style={{
                        maxWidth: 600,
                        margin: '0 auto',
                        width: '100%',
                        background: '#0D3447FF'
                    }}
                >
                    <Title level={4} style={{ textAlign: 'center', marginBottom: 24 }}>
                        Загрузите файл для анализа
                    </Title>

                    <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: 16 }}>
                        Поддерживаем, например, JSON или CSV (валидацию можно донастроить).
                    </Text>

                    <Dragger {...props} style={{ padding: 24  }}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Нажми или перетащи файл сюда</p>
                        <p className="ant-upload-hint">
                            Поддерживается одиночная загрузка. Логику валидации можно настроить в beforeUpload.
                        </p>
                    </Dragger>
                </div>
            </Card>
        </div>
    );
};

export default ProcessUploadPage;