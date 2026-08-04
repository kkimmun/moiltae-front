import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getApiError } from "../../api/axios";
import { authApi } from "../../api/moiltae";
import { Feedback } from "../../components/common/Feedback";
import { Button, Field, FormGrid, Input } from "../../styles/shared";
import {
  AuthCard,
  FieldNote,
  InputActionRow,
  PasswordInputWrap,
  PasswordToggle,
  SwitchLink,
  SwitchText,
} from "./Auth.styles";
import AuthShell from "./AuthShell";

const initialForm = {
  loginId: "",
  email: "",
  name: "",
  password: "",
  passwordConfirm: "",
  emailVerificationToken: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Signup() {
  const [form, setForm] = useState(initialForm);
  const [verificationCode, setVerificationCode] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const changeField = (field, value) => {
    setError("");
    if (field === "email") {
      setEmailSent(false);
      setEmailVerified(false);
      setVerifiedEmail("");
      setVerificationCode("");
      setMessage("");
      setForm((current) => ({
        ...current,
        email: value,
        emailVerificationToken: "",
      }));
      return;
    }
    setForm((current) => ({ ...current, [field]: value }));
  };

  const requestVerificationCode = async () => {
    const email = form.email.trim().toLowerCase();
    if (!emailPattern.test(email)) {
      setError("올바른 이메일 주소를 입력해 주세요.");
      return;
    }

    setSendingEmail(true);
    setError("");
    setMessage("");
    try {
      const response = await authApi.requestEmailVerification(email);
      setForm((current) => ({
        ...current,
        email: response.email,
        emailVerificationToken: "",
      }));
      setEmailSent(true);
      setEmailVerified(false);
      setVerifiedEmail("");
      setVerificationCode("");
      setMessage(`인증번호를 발송했습니다. ${Math.floor(response.expiresInSeconds / 60)}분 안에 입력해 주세요.`);
    } catch (requestError) {
      setError(getApiError(requestError));
    } finally {
      setSendingEmail(false);
    }
  };

  const confirmVerificationCode = async () => {
    if (!/^[0-9]{6}$/.test(verificationCode)) {
      setError("인증번호 숫자 6자리를 입력해 주세요.");
      return;
    }

    setVerifyingEmail(true);
    setError("");
    try {
      const response = await authApi.confirmEmailVerification(
        form.email.trim().toLowerCase(),
        verificationCode,
      );
      setForm((current) => ({
        ...current,
        email: response.email,
        emailVerificationToken: response.verificationToken,
      }));
      setVerifiedEmail(response.email);
      setEmailVerified(true);
      setMessage("이메일 인증이 완료되었습니다.");
    } catch (requestError) {
      setEmailVerified(false);
      setError(getApiError(requestError));
    } finally {
      setVerifyingEmail(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const normalizedEmail = form.email.trim().toLowerCase();
    if (!emailVerified || verifiedEmail !== normalizedEmail) {
      setError("이메일 인증을 완료해 주세요.");
      return;
    }
    if (form.password !== form.passwordConfirm) {
      setError("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      await authApi.signup({ ...form, email: normalizedEmail });
      navigate("/login", {
        replace: true,
        state: { message: "회원가입이 완료되었습니다. 로그인해 주세요." },
      });
    } catch (requestError) {
      setError(getApiError(requestError));
    } finally {
      setSubmitting(false);
    }
  };

  const passwordType = showPasswords ? "text" : "password";
  const passwordsMatch =
    form.passwordConfirm.length > 0 && form.password === form.passwordConfirm;

  return (
    <AuthShell>
      <AuthCard>
        <h2>계정을 만들어요</h2>
        <p>이메일 인증 후 초대에 사용할 계정을 만들어 주세요.</p>
        <FormGrid onSubmit={handleSubmit}>
          <Field>
            아이디
            <Input
              value={form.loginId}
              onChange={(event) => changeField("loginId", event.target.value)}
              pattern="[a-z0-9]{4,50}"
              minLength="4"
              maxLength="50"
              placeholder="예: member01"
              autoComplete="username"
              required
            />
          </Field>

          <Field>
            이메일
            <InputActionRow>
              <Input
                type="email"
                value={form.email}
                onChange={(event) => changeField("email", event.target.value)}
                maxLength="254"
                placeholder="example@email.com"
                autoComplete="email"
                required
              />
              <Button
                type="button"
                $variant="secondary"
                onClick={requestVerificationCode}
                disabled={sendingEmail || emailVerified}
              >
                {sendingEmail ? "발송 중..." : emailSent ? "재발송" : "인증번호 받기"}
              </Button>
            </InputActionRow>
          </Field>

          {emailSent && (
            <Field>
              인증번호
              <InputActionRow>
                <Input
                  inputMode="numeric"
                  value={verificationCode}
                  onChange={(event) =>
                    setVerificationCode(event.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  pattern="[0-9]{6}"
                  maxLength="6"
                  placeholder="숫자 6자리"
                  disabled={emailVerified}
                  required={!emailVerified}
                />
                <Button
                  type="button"
                  onClick={confirmVerificationCode}
                  disabled={verifyingEmail || emailVerified}
                >
                  {emailVerified ? "인증 완료" : verifyingEmail ? "확인 중..." : "인증 확인"}
                </Button>
              </InputActionRow>
              {emailVerified && <FieldNote $valid>인증된 이메일입니다.</FieldNote>}
            </Field>
          )}

          <Field>
            이름
            <Input
              value={form.name}
              onChange={(event) => changeField("name", event.target.value)}
              minLength="2"
              maxLength="30"
              placeholder="화면에 표시할 이름"
              autoComplete="name"
              required
            />
          </Field>

          <Field>
            비밀번호
            <PasswordInputWrap>
              <Input
                type={passwordType}
                value={form.password}
                onChange={(event) => changeField("password", event.target.value)}
                minLength="8"
                maxLength="64"
                placeholder="8자 이상 입력하세요"
                autoComplete="new-password"
                required
              />
              <PasswordToggle
                type="button"
                aria-pressed={showPasswords}
                onClick={() => setShowPasswords((current) => !current)}
              >
                {showPasswords ? "숨기기" : "표시"}
              </PasswordToggle>
            </PasswordInputWrap>
          </Field>

          <Field>
            비밀번호 확인
            <PasswordInputWrap>
              <Input
                type={passwordType}
                value={form.passwordConfirm}
                onChange={(event) => changeField("passwordConfirm", event.target.value)}
                minLength="8"
                maxLength="64"
                placeholder="비밀번호를 다시 입력하세요"
                autoComplete="new-password"
                required
              />
              <PasswordToggle
                type="button"
                aria-pressed={showPasswords}
                onClick={() => setShowPasswords((current) => !current)}
              >
                {showPasswords ? "숨기기" : "표시"}
              </PasswordToggle>
            </PasswordInputWrap>
            {form.passwordConfirm && (
              <FieldNote $valid={passwordsMatch}>
                {passwordsMatch
                  ? "비밀번호가 일치합니다."
                  : "비밀번호가 일치하지 않습니다."}
              </FieldNote>
            )}
          </Field>

          <Feedback>{error}</Feedback>
          <Feedback type="success">{message}</Feedback>
          <Button type="submit" disabled={submitting || !emailVerified}>
            {submitting ? "가입 중..." : "회원가입"}
          </Button>
        </FormGrid>
        <SwitchText>
          이미 계정이 있나요? <SwitchLink to="/login">로그인</SwitchLink>
        </SwitchText>
      </AuthCard>
    </AuthShell>
  );
}
