import { Navigate, Route, Routes } from "react-router-dom";

import DefaultLayout from "./components/layout/DefaultLayout";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import Dashboard from "./features/dashboard/Dashboard";
import Invitations from "./features/invitations/Invitations";
import CreateRoom from "./features/rooms/CreateRoom";
import RoomDetail from "./features/rooms/RoomDetail";
import { EmptyState, Page } from "./styles/shared";

function NotFound() {
  return (
    <Page>
      <EmptyState>
        <strong>페이지를 찾을 수 없습니다.</strong>
        <p>주소를 확인하거나 내 방 목록으로 돌아가 주세요.</p>
      </EmptyState>
    </Page>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DefaultLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/rooms/new" element={<CreateRoom />} />
          <Route path="/rooms/:roomId" element={<RoomDetail />} />
          <Route path="/invitations" element={<Invitations />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Route>
    </Routes>
  );
}
