import api from "./axios";

const unwrap = (request) => request.then((response) => response.data.data);

export const authApi = {
  requestEmailVerification: (email) =>
    unwrap(api.post("/auth/email-verifications", { email })),
  confirmEmailVerification: (email, code) =>
    unwrap(api.post("/auth/email-verifications/confirm", { email, code })),
  signup: (payload) => unwrap(api.post("/auth/signup", payload)),
  login: (payload) => unwrap(api.post("/auth/login", payload)),
  me: () => unwrap(api.get("/members/me")),
};

export const roomApi = {
  list: () => unwrap(api.get("/rooms")),
  create: (payload) => unwrap(api.post("/rooms", payload)),
  detail: (roomId) => unwrap(api.get(`/rooms/${roomId}`)),
  close: (roomId) => unwrap(api.patch(`/rooms/${roomId}/close`)),
};

export const invitationApi = {
  pending: () => unwrap(api.get("/invitations", { params: { status: "PENDING" } })),
  invite: (roomId, loginId) =>
    unwrap(api.post(`/rooms/${roomId}/invitations`, { loginId })),
  respond: (invitationId, status) =>
    unwrap(api.patch(`/invitations/${invitationId}`, { status })),
};

export const availabilityApi = {
  mine: (roomId) => unwrap(api.get(`/rooms/${roomId}/availabilities/me`)),
  submissions: (roomId) =>
    unwrap(api.get(`/rooms/${roomId}/availability-submissions`)),
  save: (roomId, ranges) =>
    unwrap(api.put(`/rooms/${roomId}/availabilities/me`, { ranges })),
  result: (roomId) => unwrap(api.get(`/rooms/${roomId}/overlaps`)),
};
