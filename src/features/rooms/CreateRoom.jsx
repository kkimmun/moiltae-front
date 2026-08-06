import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getApiError } from "../../api/axios";
import { roomApi } from "../../api/moiltae";
import { Feedback } from "../../components/common/Feedback";
import {
  Button,
  Card,
  Field,
  FormGrid,
  InlineActions,
  Input,
  PageHeading,
} from "../../styles/shared";
import { addDays, toDateInput, toDateTimeInput } from "../../utils/date";
import { openNativePicker } from "../../utils/nativePicker";
import { DateFields, HelperText, NarrowPage } from "./Room.styles";

const now = new Date();
const initialStart = addDays(now, 1);
const initialEnd = addDays(now, 3);
const initialClose = addDays(now, 1);
initialClose.setHours(18, 0, 0, 0);

export default function CreateRoom() {
  const [form, setForm] = useState({
    title: "",
    startDate: toDateInput(initialStart),
    endDate: toDateInput(initialEnd),
    closesAt: toDateTimeInput(initialClose),
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const update = (key) => (event) => {
    const value = event.target.value;
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (form.startDate > form.endDate) {
      setError("종료일은 시작일보다 빠를 수 없습니다.");
      return;
    }

    setSubmitting(true);
    try {
      const room = await roomApi.create(form);
      navigate(`/rooms/${room.roomId}`, { replace: true });
    } catch (requestError) {
      setError(getApiError(requestError));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <NarrowPage>
      <PageHeading>
        <div>
          <h1>새 방 만들기</h1>
          <p>사람들이 선택할 기간과 의견을 받을 마감시각을 정하세요.</p>
        </div>
      </PageHeading>

      <Card>
        <FormGrid onSubmit={handleSubmit}>
          <Field>
            방 제목
            <Input
              value={form.title}
              onChange={update("title")}
              maxLength="100"
              placeholder="예: 프로젝트 최종 회의"
              autoFocus
              required
            />
          </Field>

          <DateFields>
            <Field>
              일정 시작일
              <Input
                type="date"
                value={form.startDate}
                onClick={openNativePicker}
                onChange={update("startDate")}
                required
              />
            </Field>
            <Field>
              일정 종료일
              <Input
                type="date"
                min={form.startDate}
                value={form.endDate}
                onClick={openNativePicker}
                onChange={update("endDate")}
                required
              />
            </Field>
          </DateFields>

          <Field>
            의견 마감시각
            <Input
              type="datetime-local"
              value={form.closesAt}
              onClick={openNativePicker}
              onChange={update("closesAt")}
              required
            />
            <HelperText>
              마감시각이 지나면 자동으로 닫히며, 그 이후에는 시간을 수정할 수 없습니다.
            </HelperText>
          </Field>

          <Feedback>{error}</Feedback>
          <InlineActions>
            <Button type="submit" disabled={submitting}>
              {submitting ? "만드는 중..." : "방 만들기"}
            </Button>
            <Button type="button" $variant="secondary" onClick={() => navigate(-1)}>
              취소
            </Button>
          </InlineActions>
        </FormGrid>
      </Card>
    </NarrowPage>
  );
}
