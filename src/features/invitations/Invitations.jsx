import { useEffect, useState } from "react";

import { getApiError } from "../../api/axios";
import { invitationApi } from "../../api/moiltae";
import { Feedback, Loading } from "../../components/common/Feedback";
import { Button, EmptyState, InlineActions, Page, PageHeading } from "../../styles/shared";
import { formatDateTime } from "../../utils/date";
import { InvitationCard, InvitationList } from "./Invitations.styles";

export default function Invitations() {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    invitationApi
      .pending()
      .then(setInvitations)
      .catch((requestError) => setError(getApiError(requestError)))
      .finally(() => setLoading(false));
  }, []);

  const respond = async (invitationId, status) => {
    setWorkingId(invitationId);
    setError("");
    setMessage("");
    try {
      await invitationApi.respond(invitationId, status);
      setInvitations((current) =>
        current.filter((item) => item.invitationId !== invitationId),
      );
      setMessage(status === "ACCEPTED" ? "초대를 수락했습니다." : "초대를 거절했습니다.");
    } catch (requestError) {
      setError(getApiError(requestError));
    } finally {
      setWorkingId(null);
    }
  };

  if (loading) return <Loading />;

  return (
    <Page>
      <PageHeading>
        <div>
          <h1>받은 초대</h1>
          <p>초대는 자동 참여되지 않습니다. 내용을 확인하고 직접 선택하세요.</p>
        </div>
      </PageHeading>

      <Feedback>{error}</Feedback>
      <Feedback type="success">{message}</Feedback>

      {invitations.length === 0 ? (
        <EmptyState>
          <strong>대기 중인 초대가 없습니다.</strong>
          <p>새로운 초대가 오면 이 화면에 표시됩니다.</p>
        </EmptyState>
      ) : (
        <InvitationList>
          {invitations.map((invitation) => (
            <InvitationCard key={invitation.invitationId}>
              <div>
                <h2>{invitation.roomTitle}</h2>
                <p>
                  {invitation.ownerName}님이 초대했습니다 · {formatDateTime(invitation.requestedAt)}
                </p>
              </div>
              <InlineActions>
                <Button
                  type="button"
                  onClick={() => respond(invitation.invitationId, "ACCEPTED")}
                  disabled={workingId === invitation.invitationId}
                >
                  수락
                </Button>
                <Button
                  type="button"
                  $variant="secondary"
                  onClick={() => respond(invitation.invitationId, "REJECTED")}
                  disabled={workingId === invitation.invitationId}
                >
                  거절
                </Button>
              </InlineActions>
            </InvitationCard>
          ))}
        </InvitationList>
      )}
    </Page>
  );
}
