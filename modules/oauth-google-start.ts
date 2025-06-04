import { ZuploRequest, ZuploContext } from "@zuplo/runtime";

export default async function (request: ZuploRequest, context: ZuploContext) {
  const clientId = context.env.GOOGLE_CLIENT_ID;
  const redirectUri = context.env.GOOGLE_REDIRECT_URI;
  const scope = "https://www.googleapis.com/auth/gmail.readonly";
  
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent(scope)}&` +
    `access_type=offline`;

  return new Response(null, {
    status: 302,
    headers: { Location: authUrl }
  });
}
