import { ZuploRequest, ZuploContext, environment } from "@zuplo/runtime";
import { environment } from "@zuplo/runtime";

const clientId = environment.GOOGLE_CLIENT_ID;
const clientSecret = environment.GOOGLE_CLIENT_SECRET;
const redirectUri = environment.GOOGLE_REDIRECT_URI;


export default async function (request: ZuploRequest, context: ZuploContext) {
  const clientId = environment.GOOGLE_CLIENT_ID;
  const redirectUri = environment.GOOGLE_REDIRECT_URI;
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
