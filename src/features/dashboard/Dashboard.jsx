import { useEffect, useState } from "react";

import { getApiError } from "../../api/axios";
import { invitationApi, roomApi } from "../../api/moiltae";
import { Feedback, Loading } from "../../components/common/Feedback";
import { Badge, EmptyState, Page, PageHeading } from "../../styles/shared";
import { formatDate, formatDateTime, isDeadlinePassed } from "../../utils/date";
import {
  CardTop,
  Hero,
  HeroNumber,
  OwnerMark,
  QuickLink,
  QuickLinks,
  RoomCard,
  RoomGrid,
  RoomMeta,
} from "./Dashboard.styles";

export default function Dashboard() {
  const [rooms, setRooms] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    Promise.allSettled([roomApi.list(), invitationApi.pending()])
      .then(([roomResult, invitationResult]) => {
        if (!alive) return;
        if (roomResult.status === "rejected") {
          setError(getApiError(roomResult.reason));
          return;
        }
        setRooms(roomResult.value);
        if (invitationResult.status === "fulfilled") {
          setPendingCount(invitationResult.value.length);
        }
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <Loading />;

  return (
    <Page>
      <Hero>
        <div>
          <h1>모두의 빈 시간, 한 번에 모아봐요.</h1>
          <p>
            참여 중인 방을 열어 내 시간을 표시하세요. 결과는 마감된 뒤에만
            공개되므로 다른 사람의 선택에 영향을 받지 않습니다.
          </p>
        </div>
        <HeroNumber>
          <strong>{rooms.length}</strong>
          <span>참여 중인 방</span>
        </HeroNumber>
      </Hero>

      <QuickLinks>
        <QuickLink to="/rooms/new">
          <div>
            <strong>새 방 만들기</strong>
            <small>기간과 마감시각을 정하고 회원을 초대하세요.</small>
          </div>
          <span>＋</span>
        </QuickLink>
        <QuickLink to="/invitations">
          <div>
            <strong>받은 초대</strong>
            <small>수락한 방만 내 방 목록에 추가됩니다.</small>
          </div>
          <span>{pendingCount}</span>
        </QuickLink>
      </QuickLinks>

      <PageHeading>
        <div>
          <h1>내 방</h1>
          <p>내가 만들었거나 초대를 수락한 방만 표시됩니다.</p>
        </div>
      </PageHeading>

      <Feedback>{error}</Feedback>
      {!error && rooms.length === 0 ? (
        <EmptyState>
          <strong>아직 참여 중인 방이 없습니다.</strong>
          <p>새 방을 만들거나 받은 초대를 확인해 보세요.</p>
        </EmptyState>
      ) : (
        <RoomGrid>
          {rooms.map((room) => {
            const effectiveStatus =
              room.status === "CLOSED" || isDeadlinePassed(room.closesAt)
                ? "CLOSED"
                : "OPEN";
            return (
              <RoomCard key={room.roomId} to={`/rooms/${room.roomId}`}>
                <CardTop>
                  <Badge $status={effectiveStatus}>
                    {effectiveStatus === "CLOSED" ? "마감" : "진행 중"}
                  </Badge>
                  {room.owner && <OwnerMark>내가 만든 방</OwnerMark>}
                </CardTop>
                <h3>{room.title}</h3>
                <RoomMeta>
                  <span>
                    {formatDate(room.startDate)} – {formatDate(room.endDate)}
                  </span>
                  <span>참여자 {room.memberCount}명</span>
                  <span>마감 {formatDateTime(room.closesAt)}</span>
                </RoomMeta>
              </RoomCard>
            );
          })}
        </RoomGrid>
      )}
    </Page>
  );
}
