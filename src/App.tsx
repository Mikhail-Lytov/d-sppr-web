import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import ProcessUploadPage from './pages/ProcessUploadPage';
import BusinessOperationsPage from "./pages/BusinessOperationsPage.tsx";

const DashboardPage = () => <div>Dashboard page</div>;
const UserPage = ({ name }: { name: string }) => <div>User: {name}</div>;
const FilesPage = () => <div>Files page</div>;

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    {/* главная */}
                    <Route index element={<DashboardPage />} />


                    {/* если тебе ещё нужен /process/parser, можно оставить и его */}
                    <Route path="process/parser" element={<ProcessUploadPage />} />

                    <Route path="settings/system" element={<FilesPage/>}/>

                    <Route path="manual" element={<FilesPage/>}/>

                    <Route path="typical/task" element={<BusinessOperationsPage/>}/>
                    {/* другие страницы */}
                    <Route path="files" element={<FilesPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;