import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import {
  HeaderBar,
  HeaderInner,
  Logo,
  LogoutButton,
  MenuLink,
  Navigation,
  UserArea,
  UserName,
} from "./Layout.styles";

export default function Header() {
  const navigate = useNavigate();
  const { member, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <HeaderBar>
      <HeaderInner>
        <Logo type="button" onClick={() => navigate("/")} aria-label="내 방 목록">
          모일<span>때</span>
        </Logo>

        <Navigation aria-label="주요 메뉴">
          <MenuLink to="/" end>
            내 방
          </MenuLink>
          <MenuLink to="/invitations">받은 초대</MenuLink>
          <MenuLink to="/rooms/new">방 만들기</MenuLink>
        </Navigation>

        <UserArea>
          <UserName>
            <strong>{member?.name}</strong>님
          </UserName>
          <LogoutButton type="button" onClick={handleLogout}>
            로그아웃
          </LogoutButton>
        </UserArea>
      </HeaderInner>
    </HeaderBar>
  );
}
