import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getApiError } from "../../api/axios";
import { availabilityApi, invitationApi, roomApi } from "../../api/moiltae";
import { Feedback, Loading } from "../../components/common/Feedback";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Field,
  FormGrid,
  InlineActions,
  Input,
  Page,
} from "../../styles/shared";
import {
  formatDate,
  formatDateTime,
  formatDateTimeRange,
  isDeadlinePassed,
} from "../../utils/date";
import {
  DetailHeading,
  MemberList,
  ResultItem,
  ResultList,
  SectionGrid,
  SectionTitle,
  Stack,
  SubmissionHeaderActions,
  SubmissionPanel,
  UnsubmittedList,
} from "./Room.styles";
import TimeRangeEditor from "./TimeRangeEditor";

let rangeDraftSequence = 0;

function createRangeDraft(date, startTime = "09:00", endTime = "18:00") {
  rangeDraftSequence += 1;
  return {
    id: `range-${rangeDraftSequence}`,
    date,
    startTime,
    endTime,
  };
}

function toRangeDraft(range) {
  return createRangeDraft(
    range.startAt.slice(0, 10),
    range.startAt.slice(11, 16),
    range.endAt.slice(11, 16),
  );
}

function toRangePayload(range) {
  return {
    startAt: `${range.date}T${range.startTime}:00`,
    endAt: `${range.date}T${range.endTime}:00`,
  };
}

function createDrafts(detail, mine) {
  const drafts = mine.ranges.map(toRangeDraft);
  if (
    drafts.length === 0 &&
    detail.status === "OPEN" &&
    !isDeadlinePassed(detail.closesAt)
  ) {
    drafts.push(createRangeDraft(detail.startDate));
  }
  return drafts;
}

async function fetchRoomState(roomId) {
  let detail = await roomApi.detail(roomId);
  const [mine, submissionData] = await Promise.all([
    availabilityApi.mine(roomId),
    detail.owner ? availabilityApi.submissions(roomId) : Promise.resolve(null),
  ]);
  let resultData = null;

  if (detail.status === "CLOSED" || isDeadlinePassed(detail.closesAt)) {
    resultData = await availabilityApi.result(roomId);
    if (detail.status !== "CLOSED") detail = await roomApi.detail(roomId);
  }

  return { detail, mine, resultData, submissionData };
}

export default function RoomDetail() {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [ranges, setRanges] = useState([]);
  const [result, setResult] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [inviteLoginId, setInviteLoginId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let alive = true;
    fetchRoomState(roomId)
      .then(({ detail, mine, resultData, submissionData }) => {
        if (!alive) return;
        setRoom(detail);
        setRanges(createDrafts(detail, mine));
        setResult(resultData);
        setSubmissionStatus(submissionData);
      })
      .catch((requestError) => alive && setError(getApiError(requestError)))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [roomId]);

  const refresh = async () => {
    const { detail, mine, resultData, submissionData } = await fetchRoomState(roomId);
    setRoom(detail);
    setRanges(createDrafts(detail, mine));
    setResult(resultData);
    setSubmissionStatus(submissionData);
  };

  const isClosed = room
    ? room.status === "CLOSED" || isDeadlinePassed(room.closesAt)
    : false;

  const updateRange = (rangeId, field, value) => {
    if (isClosed) return;
    setRanges((current) =>
      current.map((range) =>
        range.id === rangeId ? { ...range, [field]: value } : range,
      ),
    );
    setError("");
    setMessage("");
  };

  const addRange = () => {
    const defaultDate = ranges.at(-1)?.date || room.startDate;
    setRanges((current) => [...current, createRangeDraft(defaultDate)]);
    setMessage("");
  };

  const removeRange = (rangeId) => {
    setRanges((current) => current.filter((range) => range.id !== rangeId));
    setMessage("");
  };

  const refreshSubmissionStatus = async () => {
    setError("");
    try {
      setSubmissionStatus(await availabilityApi.submissions(roomId));
    } catch (requestError) {
      setError(getApiError(requestError));
    }
  };

  const saveAvailability = async () => {
    const incomplete = ranges.some(
      (range) => !range.date || !range.startTime || !range.endTime,
    );
    if (incomplete) {
      setError("날짜와 시작·종료 시간을 모두 입력해 주세요.");
      return;
    }
    const invalidDate = ranges.some(
      (range) => range.date < room.startDate || range.date > room.endDate,
    );
    if (invalidDate) {
      setError("방에서 정한 일정 기간 안의 날짜를 입력해 주세요.");
      return;
    }
    const invalidTime = ranges.some(
      (range) => range.startTime >= range.endTime,
    );
    if (invalidTime) {
      setError("시작 시간은 종료 시간보다 빨라야 합니다.");
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");
    try {
      const response = await availabilityApi.save(
        roomId,
        ranges.map(toRangePayload),
      );
      setRanges(response.ranges.map(toRangeDraft));
      if (room.owner) {
        setSubmissionStatus(await availabilityApi.submissions(roomId));
      }
      setMessage(
        response.savedCount === 0
          ? "등록한 가능 시간을 모두 삭제했습니다."
          : `${response.savedCount}개의 가능 시간 구간을 저장했습니다.`,
      );
    } catch (requestError) {
      setError(getApiError(requestError));
    } finally {
      setSaving(false);
    }
  };

  const invite = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    try {
      await invitationApi.invite(roomId, inviteLoginId.trim());
      setInviteLoginId("");
      setMessage("초대를 보냈습니다. 상대방이 수락하면 참여자에 추가됩니다.");
    } catch (requestError) {
      setError(getApiError(requestError));
    }
  };

  const closeRoom = async () => {
    if (!window.confirm("방을 마감하면 더 이상 시간을 수정할 수 없습니다. 마감할까요?")) return;
    setError("");
    try {
      await roomApi.close(roomId);
      setMessage("방을 마감했습니다.");
      await refresh();
    } catch (requestError) {
      setError(getApiError(requestError));
    }
  };

  if (loading) return <Loading />;
  if (!room) {
    return (
      <Page>
        <Feedback>{error}</Feedback>
      </Page>
    );
  }

  return (
    <Page>
      <DetailHeading>
        <div>
          <Badge $status={isClosed ? "CLOSED" : "OPEN"}>
            {isClosed ? "마감" : "진행 중"}
          </Badge>
          <h1>{room.title}</h1>
          <p>
            {formatDate(room.startDate)} – {formatDate(room.endDate)} · 의견 마감 {formatDateTime(room.closesAt)}
          </p>
        </div>
        {room.owner && !isClosed && (
          <Button type="button" $variant="danger" onClick={closeRoom}>
            지금 마감하기
          </Button>
        )}
      </DetailHeading>

      <Stack>
        <Feedback>{error}</Feedback>
        <Feedback type="success">{message}</Feedback>

        <SectionGrid>
          <Card>
            <SectionTitle>
              <div>
                <h2>내가 가능한 시간</h2>
                <small>연속되지 않은 시간은 구간을 추가해서 따로 등록할 수 있습니다.</small>
              </div>
            </SectionTitle>
            <TimeRangeEditor
              ranges={ranges}
              startDate={room.startDate}
              endDate={room.endDate}
              disabled={isClosed}
              onChange={updateRange}
              onRemove={removeRange}
            />
            {!isClosed && (
              <InlineActions style={{ marginTop: 18 }}>
                <Button type="button" $variant="secondary" onClick={addRange} disabled={saving}>
                  시간 구간 추가
                </Button>
                <Button type="button" onClick={saveAvailability} disabled={saving}>
                  {saving ? "저장 중..." : "가능 시간 저장"}
                </Button>
                <Button
                  type="button"
                  $variant="secondary"
                  onClick={() => setRanges([])}
                  disabled={saving || ranges.length === 0}
                >
                  입력 모두 지우기
                </Button>
              </InlineActions>
            )}
          </Card>

          <Stack>
            <Card>
              <SectionTitle>
                <h2>참여자</h2>
                <small>{room.members.length}명</small>
              </SectionTitle>
              <MemberList>
                {room.members.map((member) => (
                  <li key={member.memberId}>
                    {member.name}
                    {member.memberId === room.ownerId && <span>방장</span>}
                  </li>
                ))}
              </MemberList>
              {room.owner && submissionStatus && (
                <SubmissionPanel $complete={submissionStatus.unsubmittedMemberCount === 0}>
                  <div>
                    <h3>시간 등록 현황</h3>
                    <SubmissionHeaderActions>
                      <strong>
                        {submissionStatus.submittedMemberCount}/{submissionStatus.totalMemberCount}명 등록
                      </strong>
                      <button type="button" onClick={refreshSubmissionStatus}>
                        새로고침
                      </button>
                    </SubmissionHeaderActions>
                  </div>
                  {submissionStatus.unsubmittedMemberCount === 0 ? (
                    <p>모든 참여자가 시간을 등록했습니다.</p>
                  ) : (
                    <UnsubmittedList>
                      <small>미등록 {submissionStatus.unsubmittedMemberCount}명</small>
                      <ul>
                        {submissionStatus.unsubmittedMembers.map((member) => (
                          <li key={member.memberId}>{member.name}</li>
                        ))}
                      </ul>
                    </UnsubmittedList>
                  )}
                </SubmissionPanel>
              )}
            </Card>

            {room.owner && !isClosed && (
              <Card>
                <SectionTitle>
                  <h2>회원 초대</h2>
                </SectionTitle>
                <FormGrid onSubmit={invite}>
                  <Field>
                    상대방 아이디
                    <Input
                      value={inviteLoginId}
                      onChange={(event) => setInviteLoginId(event.target.value)}
                      placeholder="예: member02"
                      required
                    />
                  </Field>
                  <Button type="submit">초대 보내기</Button>
                </FormGrid>
              </Card>
            )}
          </Stack>
        </SectionGrid>

        {isClosed && (
          <Card>
            <SectionTitle>
              <div>
                <h2>가장 많이 겹치는 시간</h2>
                <small>최대 인원이 같은 시간 구간은 모두 표시됩니다.</small>
              </div>
            </SectionTitle>

            {!result || result.ranges.length === 0 ? (
              <EmptyState>
                <strong>계산할 수 있는 시간이 없습니다.</strong>
                <p>마감 전에 등록된 가능 시간이 없었습니다.</p>
              </EmptyState>
            ) : (
              <ResultList>
                {result.ranges.map((range) => (
                  <ResultItem key={`${range.startAt}-${range.endAt}`}>
                    <div>
                      <strong>{formatDateTimeRange(range.startAt, range.endAt)}</strong>
                      <p>{range.members.map((member) => member.name).join(", ")}</p>
                    </div>
                    <span>
                      {range.availableMemberCount}명 / 전체 {result.totalMemberCount}명
                    </span>
                  </ResultItem>
                ))}
              </ResultList>
            )}
          </Card>
        )}
      </Stack>
    </Page>
  );
}
