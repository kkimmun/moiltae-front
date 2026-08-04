import {
  AuthPage,
  Brand,
  FormPanel,
  IntroCopy,
  IntroPanel,
  StepLine,
} from "./Auth.styles";

export default function AuthShell({ children }) {
  return (
    <AuthPage>
      <IntroPanel>
        <Brand>
          모일<span>때</span>
        </Brand>
        <IntroCopy>
          <small>TIME, TOGETHER</small>
          <h1>
            물어보는 시간은 줄이고,
            <br />
            만나는 시간은 늘리고.
          </h1>
          <p>
            방을 만들고 사람을 초대하세요. 각자가 가능한 시간만 고르면
            가장 많이 겹치는 시간이 자동으로 정리됩니다.
          </p>
        </IntroCopy>
        <StepLine aria-label="이용 순서">
          <span>01 방 만들기</span>
          <span>02 초대 수락</span>
          <span>03 시간 선택</span>
        </StepLine>
      </IntroPanel>
      <FormPanel>{children}</FormPanel>
    </AuthPage>
  );
}
