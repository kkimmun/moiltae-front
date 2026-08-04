import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getApiError } from "../../api/axios";
import { Feedback } from "../../components/common/Feedback";
import { useAuth } from "../../context/AuthContext";
import { Button, Field, FormGrid, Input } from "../../styles/shared";
import { AuthCard, SwitchLink, SwitchText } from "./Auth.styles";
import AuthShell from "./AuthShell";

export default function Login() {
  const [form, setForm] = useState({ loginId: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await login(form);
      navigate(location.state?.from || "/", { replace: true });
    } catch (requestError) {
      setError(getApiError(requestError));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell>
      <AuthCard>
        <h2>다시 만났네요</h2>
        <p>로그인하고 참여 중인 방과 받은 초대를 확인하세요.</p>
        <FormGrid onSubmit={handleSubmit}>
          <Feedback type="success">{location.state?.message}</Feedback>
          <Field>
            아이디
            <Input
              autoComplete="username"
              value={form.loginId}
              onChange={(event) =>
                setForm((current) => ({ ...current, loginId: event.target.value }))
              }
              placeholder="영문 소문자와 숫자"
              required
            />
          </Field>
          <Field>
            비밀번호
            <Input
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={(event) =>
                setForm((current) => ({ ...current, password: event.target.value }))
              }
              placeholder="비밀번호를 입력하세요"
              required
            />
          </Field>
          <Feedback>{error}</Feedback>
          <Button type="submit" disabled={submitting}>
            {submitting ? "로그인 중..." : "로그인"}
          </Button>
        </FormGrid>
        <SwitchText>
          아직 계정이 없나요? <SwitchLink to="/signup">회원가입</SwitchLink>
        </SwitchText>
      </AuthCard>
    </AuthShell>
  );
}
