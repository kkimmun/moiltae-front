import { Outlet } from "react-router-dom";

import Header from "./Header";
import { Content, FooterBar } from "./Layout.styles";

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <FooterBar>가능한 시간을 모으면, 약속은 자연스럽게 정해집니다.</FooterBar>
    </>
  );
}
